import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import Providers from "@/components/provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import CartStateProvider from "./context/cartStateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jess Bakers",
  description: "Created by Sharoon Masih",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={
      {
        layout: {
          helpPageUrl: "https://clerk.dev/support",
          privacyPageUrl: "https://clerk.dev/privacy",
          showOptionalFields: true,
          socialButtonsPlacement: "top",
          socialButtonsVariant: "iconButton",
          termsPageUrl: "https://clerk.dev/terms",
        },
        variables: {

          colorDanger: "red",
          colorSuccess: "green",

          // colorText: "white"
        },
        elements: {
          formButtonPrimary: "bg-[#4A1D1F] border-3 border-[#4A1D1F] hover:bg-[#FBEDCD] hover:text-primary text-sm normal-case",

        }
      }
    }>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <CartStateProvider>
            <Navbar/>
            {children}
            <Toaster />
            <Footer />
            </CartStateProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
