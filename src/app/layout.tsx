"use client";
import type { Metadata } from "next";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoader } from "@/components/ui/global-loader";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "My Ecommerce App",
  description: "Built with Next.js 14 + TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Header />

        <main className="w-full px-0 ">{children}</main>

        <Footer />
        <GlobalLoader />
        <Toaster position="top-right" />
        <WhatsAppButton />
      </body>
    </html>
  );
}
