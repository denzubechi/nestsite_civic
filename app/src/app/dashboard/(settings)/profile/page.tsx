"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@civic/auth-web3/react";
import { userHasWallet } from "@civic/auth-web3";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, CheckCircle } from "lucide-react";
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
interface WithdrawalRequest {
  recipientAddress: string;
  amount: number | "";
}

const SolanaProfilePage = () => {
  const [activeTab, setActiveTab] = useState("wallet");
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();
  const endpoint =
    "https://solana-devnet.g.alchemy.com/v2/ifBhMhdoziKv9xLm3VDGcmaESI_RxrDF";
  const [withdrawalRequest, setWithdrawalRequest] = useState<WithdrawalRequest>(
    {
      recipientAddress: "",
      amount: "",
    }
  );
  const [copied, setCopied] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalStatus, setWithdrawalStatus] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { connection } = useConnection();
  const [twitterUrl, setTwitterUrl] = useState<string>("");
  const [linkedInUrl, setLinkedInUrl] = useState<string>("");
  const [instagramUrl, setInstagramUrl] = useState<string>("");
  const [facebookUrl, setFacebookUrl] = useState<string>("");
  const [youTubeUrl, setYouTubeUrl] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchWalletData = async () => {
    setLoading(true);
    setError(null);
    setShowErrorAlert(false);
    setShowSuccessAlert(false);

    try {
      if (user && userHasWallet(user)) {
        console.log(user);
        setWalletAddress(user.solana.address);
        const connection = new Connection(endpoint);
        const publicKey = new PublicKey(user.solana.address);
        const balanceInLamports = await connection.getBalance(publicKey);
        setBalance(balanceInLamports / 1e9);
      } else if (user) {
        setWalletAddress("");
        setBalance(null);
        setError("No wallet found for this user.");
        setShowErrorAlert(true);
      } else {
        setError("No user found. Please log in.");
        setShowErrorAlert(true);
      }
    } catch (error: any) {
      console.error("Error fetching wallet data:", error);
      setError(error.message || "Failed to fetch wallet data.");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        if (user?.idToken) {
          const response = await fetch("/api/dashboard/profile", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.idToken}`,
            },
          });
          if (response.ok) {
            const profileData = await response.json();
            setTwitterUrl(profileData.twitterUrl || "");
            setLinkedInUrl(profileData.linkedInUrl || "");
            setInstagramUrl(profileData.instagramUrl || "");
            setFacebookUrl(profileData.facebookUrl || "");
            setYouTubeUrl(profileData.youTubeUrl || "");
          } else {
            console.error("Failed to fetch profile data:", response);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // setError("Error loading profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
    fetchProfileData();
  }, [user, endpoint]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWithdrawalRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleWithdraw = async () => {
    setIsWithdrawing(true);
    setWithdrawalStatus("Processing withdrawal...");
    setError(null);
    setShowErrorAlert(false);
    setShowSuccessAlert(false);

    try {
      if (
        !user ||
        !userHasWallet(user) ||
        !user.solana?.wallet ||
        !user.solana?.wallet?.publicKey
      ) {
        setError("Solana wallet not connected.");
        setShowErrorAlert(true);
        return;
      }

      const recipient = withdrawalRequest.recipientAddress;
      const amountToSend = parseFloat(withdrawalRequest.amount as string);

      if (!recipient) {
        setError("Please enter a recipient address.");
        setShowErrorAlert(true);
        return;
      }

      if (isNaN(amountToSend) || amountToSend <= 0) {
        setError("Please enter a valid amount to withdraw.");
        setShowErrorAlert(true);
        return;
      }
      const { publicKey } = user.solana.wallet;

      const recipientPublicKey = new PublicKey(recipient);
      const lamportsToSend = amountToSend * LAMPORTS_PER_SOL;

      const token = user?.idToken;
      console.log("Token being used:", token);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPublicKey,
          lamports: lamportsToSend,
        })
      );

      // transaction.feePayer = publicKey;
      // const latestBlockhash = await connection.getLatestBlockhash();
      // transaction.recentBlockhash = latestBlockhash.blockhash;

      // const signedTransaction = await user.solana.wallet.signTransaction(
      //   transaction
      // );

      const signature = await user?.solana?.wallet.sendTransaction(
        transaction,
        connection
      );
      // const signature = await connection.sendRawTransaction(
      //   signedTransaction.serialize()
      // );

      await connection.confirmTransaction(signature, "confirmed");

      setWithdrawalStatus(
        `Withdrawal successful! Transaction ID: ${signature}`
      );
      setShowSuccessAlert(true);
      setWithdrawalRequest({ recipientAddress: "", amount: "" });
      fetchWalletData();
    } catch (err: any) {
      setError(err.message || "Withdrawal failed.");
      setShowErrorAlert(true);
      setWithdrawalStatus("Withdrawal failed.");
    } finally {
      setIsWithdrawing(false);
    }
  };
  const getNameInitials = (name: string | undefined | null): string => {
    if (!name) return "";
    const parts = name.split(" ");
    let initials = "";
    if (parts.length >= 1 && parts[0]) {
      initials += parts[0][0].toUpperCase();
    }
    if (parts.length >= 2 && parts[1]) {
      initials += parts[1][0].toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 1) {
      initials += parts[0][1].toUpperCase();
    }
    return initials;
  };
  const truncateAddress = (address: string, chars = 6) => {
    if (!address) return "";
    const front = address.substring(0, chars);
    const back = address.substring(address.length - chars);
    return `${front}...${back}`;
  };

  const handleUpdateSocialUrls = async () => {
    setLoading(true);
    try {
      if (user?.idToken) {
        const response = await fetch("/api/dashboard/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`,
          },
          body: JSON.stringify({
            twitterUrl,
            linkedInUrl,
            instagramUrl,
            facebookUrl,
            youTubeUrl,
          }),
        });

        if (response.ok) {
          setToastMessage("Social URLs updated successfully!");
          setToastOpen(true);
          setIsEditing(false);
        } else {
          const errorData = await response.json();
          console.error("Failed to update social URLs:", errorData);
          setError(
            errorData.error || "Failed to update social URLs. Please try again."
          );
          setShowErrorAlert(true);
        }
      }
    } catch (error) {
      console.error("Error updating social URLs:", error);
      setError("Error updating social URLs.");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="px-2">
        <Skeleton className="w-full h-20 bg-gray-400 my-4" />
        <Skeleton className="w-full h-20 bg-gray-400 my-4" />
        <Skeleton className="w-full h-20 bg-gray-400 my-4" />
      </div>
    );
  }

  return (
    <div className="px-2">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("basic")}
          className={`px-4 py-2 -mb-px ${
            activeTab === "basic"
              ? "border-b-2 border-indigo-500 text-primary font-semibold"
              : "text-gray-500 hover:text-indigo-600"
          } focus:outline-none`}
        >
          Basic Profile
        </button>
        <button
          onClick={() => setActiveTab("wallet")}
          className={`px-4 py-2 -mb-px ${
            activeTab === "wallet"
              ? "border-b-2 border-blue-500 text-primary font-semibold"
              : "text-gray-500 hover:text-blue-600"
          } focus:outline-none`}
        >
          Wallet Info
        </button>
      </div>

      {activeTab === "basic" && (
        <div>
          <div className="mt-6 p-6 rounded-md shadow-sm bg-white border-2  flex flex-col items-center">
            <Avatar className="w-24 h-24 rounded-full bg-purple-200 text-purple-700 mb-4">
              {user?.user?.picture ? (
                <img
                  src={user.user.picture}
                  alt="Profile Picture"
                  className="rounded-full object-cover"
                />
              ) : (
                <span>{getNameInitials(user?.user?.name)}</span>
              )}
            </Avatar>
            <div className="text-center mb-2">
              <h3 className="text-xl font-semibold text-purple-800">
                {user?.user?.name || (
                  <span className="italic">Not available</span>
                )}
              </h3>
            </div>
            <div className="text-center">
              {user?.user?.email && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user.user.email}
                </p>
              )}
            </div>
          </div>

          <div className="p-6 rounded-md shadow-sm bg-white mt-6">
            <h2 className="text-lg font-semibold mb-4 text-purple-800">
              Social Profiles
            </h2>
            {isEditing ? (
              <>
                <div className="mb-4">
                  <Label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Twitter
                  </Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <Twitter className="h-4 w-4" />,
                    </span>
                    <Input
                      id="twitter"
                      type="text"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      className="flex-1 min-w-0 rounded-none rounded-r-md sm:text-sm"
                      placeholder="https://twitter.com/yourprofile"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    LinkedIn
                  </Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <Linkedin className="h-4 w-4" />
                    </span>
                    <Input
                      id="linkedin"
                      type="text"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      className="flex-1 min-w-0 rounded-none rounded-r-md sm:text-sm"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="instagram"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Instagram
                  </Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <Instagram className="h-4 w-4" />
                    </span>
                    <Input
                      id="instagram"
                      type="text"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      className="flex-1 min-w-0 rounded-none rounded-r-md sm:text-sm"
                      placeholder="https://instagram.com/yourprofile"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="facebook"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Facebook
                  </Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <Facebook className="h-4 w-4" />
                    </span>
                    <Input
                      id="facebook"
                      type="text"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      className="flex-1 min-w-0 rounded-none rounded-r-md sm:text-sm"
                      placeholder="https://facebook.com/yourprofile"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor="youtube"
                    className="block text-sm font-medium text-gray-700"
                  >
                    YouTube
                  </Label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      <Youtube className="h-4 w-4" />
                    </span>
                    <Input
                      id="youtube"
                      type="text"
                      value={youTubeUrl}
                      onChange={(e) => setYouTubeUrl(e.target.value)}
                      className="flex-1 min-w-0 rounded-none rounded-r-md sm:text-sm"
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateSocialUrls}
                    disabled={loading} // Disable during update
                  >
                    {loading ? "Saving..." : "Update Profile"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center mb-2">
                  <Twitter className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    Twitter:
                  </span>
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm truncate ml-auto"
                  >
                    {twitterUrl || "Not set"}
                  </a>
                </div>
                <div className="flex items-center mb-2">
                  <Linkedin className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    LinkedIn:
                  </span>
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm truncate ml-auto"
                  >
                    {linkedInUrl || "Not set"}
                  </a>
                </div>
                <div className="flex items-center mb-2">
                  <Instagram className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    Instagram:
                  </span>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm truncate ml-auto"
                  >
                    {instagramUrl || "Not set"}
                  </a>
                </div>
                <div className="flex items-center mb-2">
                  <Facebook className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    Facebook:
                  </span>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm truncate ml-auto"
                  >
                    {facebookUrl || "Not set"}
                  </a>
                </div>
                <div className="flex items-center mb-4">
                  <Youtube className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">
                    YouTube:
                  </span>
                  <a
                    href={youTubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm truncate ml-auto"
                  >
                    {youTubeUrl || "Not set"}
                  </a>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "wallet" && (
        <div className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className=" backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-sm bg-white border"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                  <AvatarImage
                    src={`https://robohash.org/${walletAddress || "default"}`}
                    alt="Wallet Avatar"
                  />
                  <AvatarFallback>
                    {getNameInitials(user?.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">
                    {user?.user?.name || (
                      <span className="italic">Not available</span>
                    )}
                  </h1>
                  {balance !== null ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="text-2xl sm:text-3xl font-bold text-black"
                    >
                      {balance.toLocaleString()} SOL
                    </motion.div>
                  ) : (
                    <Skeleton className="w-full h-8 bg-gray-400 my-4" />
                  )}
                  <p className="text-sm text-green-400">+0.2%</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {walletAddress && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 font-mono truncate max-w-[150px] sm:max-w-[200px] break-all">
                      {truncateAddress(walletAddress)}
                    </span>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 1500);
                      }}
                      className="text-gray-800 hover:text-gray-600  transition-colors"
                      aria-label="Copy Address"
                    >
                      {copied ? (
                        <CheckCircle className={"h-6 w-6"} />
                      ) : (
                        <Copy className={"h-6 w-6"} />
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          <div className="rounded-xl border p-6 shadow-md bg-white mt-6">
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-lg font-semibold">Withdraw Your SOL</h2>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <label
                  htmlFor="recipientAddress"
                  className="text-right md:text-left text-sm text-gray-700"
                >
                  To Address:
                </label>
                <Input
                  id="recipientAddress"
                  type="text"
                  name="recipientAddress"
                  placeholder="Enter  Solana address"
                  value={withdrawalRequest.recipientAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                <label
                  htmlFor="amount"
                  className="text-right md:text-left text-sm text-gray-700"
                >
                  Amount (SOL):
                </label>
                <Input
                  id="amount"
                  type="number"
                  name="amount"
                  placeholder="Amount to send"
                  value={withdrawalRequest.amount}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                onClick={handleWithdraw}
                disabled={isWithdrawing}
                variant={"default"}
              >
                {isWithdrawing ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Initiate Withdrawal"
                )}
              </Button>
            </div>

            {showSuccessAlert && withdrawalStatus && (
              <Alert className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
                <AlertTitle>Transfer Successful: </AlertTitle>
                <AlertDescription>{withdrawalStatus}</AlertDescription>
              </Alert>
            )}

            {showErrorAlert && error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Failed: </AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {withdrawalStatus && !showSuccessAlert && !showErrorAlert && (
              <p className="mt-4 text-sm text-gray-500">{withdrawalStatus}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SolanaProfilePage;
