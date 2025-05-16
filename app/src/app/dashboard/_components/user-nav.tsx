"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import NotificationsDropdown from "./notifications-dropdown";

export function UserNav() {
  const user = useUser();
  const [hasWallet, setHasWallet] = useState(false);
  const [walletAddressSaved, setWalletAddressSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const checkWallet = () => {
      const hasUserWallet = userHasWallet(user);
      setHasWallet(hasUserWallet);
      return hasUserWallet;
    };

    checkWallet();
  }, [user]);

  useEffect(() => {
    if (!user || !hasWallet || walletAddressSaved) {
      return;
    }

    const saveWalletAddress = async () => {
      const solWalletAddress = userHasWallet(user)
        ? user.solana?.address || null
        : null;
      if (solWalletAddress) {
        console.log("Saving wallet address:", solWalletAddress);
        try {
          const response = await fetch("/api/dashboard/wallet", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ solWalletAddress }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error saving wallet address:", errorData.error);
          } else {
            console.log("Wallet address saved successfully.");
            setWalletAddressSaved(true);
          }
        } catch (error) {
          console.error("Error saving address:", error);
        }
      }
    };

    saveWalletAddress();
  }, [user, hasWallet, walletAddressSaved]);

  return (
    <div className="flex items-center gap-2">
      <NotificationsDropdown />
      <UserButton className="w-full" />
    </div>
  );
}
