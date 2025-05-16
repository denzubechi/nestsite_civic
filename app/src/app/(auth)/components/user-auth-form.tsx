import { UserButton, useUser } from "@civic/auth-web3/react";
import { HTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import logo from "@/assets/Frame 49.png";
import Image from "next/image";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"default" | "destructive">(
    "default"
  );
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const createUserInDatabase = async () => {
      if (!user?.user?.id) return;
      console.log(user);
      setIsLoading(true);
      setToastMessage("signing user...");
      setToastVariant("default");
      setToastOpen(true);

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "Error creating/finding user in database:",
            errorData.error
          );
          setToastMessage(errorData.error || "Failed to create user account.");
          setToastVariant("destructive");
          setToastOpen(true);
        } else {
          console.log("User creation/check successful.");
          setToastMessage("Account created successfully!");
          setTimeout(() => setToastOpen(false), 2000);
        }
      } catch (error: any) {
        console.error("Error calling user creation API:", error);
        setToastMessage("Failed to communicate with the server.");
        setToastVariant("destructive");
        setToastOpen(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (user.user) {
      createUserInDatabase();
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <ToastProvider swipeDirection="right">
      <div className={cn("grid gap-6", className)} {...props}>
        <div className="grid gap-4">
          <div className="space-y-4 text-center">
            {" "}
            <div className="flex justify-center">
              <Image src={logo} alt="Nestsite Logo" width={150} height={60} />
            </div>
            <div>
              <p className=" font-medium"></p>
              <p className="text-muted-foreground">
                Welcome👋, Sign in securely to access your dashboard
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <UserButton
              className="w-full bg-[7934F5] text-white font-semibold py-3 rounded-md"
              style={{ background: "#7934F5", color: "white" }}
            />
            {isLoading && (
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                {toastMessage || "Signing User..."}
              </div>
            )}
          </div>
        </div>
        <Toast
          open={toastOpen}
          onOpenChange={setToastOpen}
          variant={toastVariant}
        >
          <ToastTitle>{toastMessage}</ToastTitle>
        </Toast>
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}
