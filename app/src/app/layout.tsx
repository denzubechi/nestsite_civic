import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { GLOBAL } from "@/lib/constants";
import ClientProvider from "./ClientProvider";
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";
import AppWalletProvider from "@/components/AppWalletProvider";
const inter = Inter({ subsets: ["latin"] });
const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: GLOBAL.APP_TITLE,
  description: GLOBAL.APP_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <AppWalletProvider>
          <CivicAuthProvider>
            <ClientProvider>{children}</ClientProvider>
          </CivicAuthProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
