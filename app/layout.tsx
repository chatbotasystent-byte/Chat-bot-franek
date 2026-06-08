import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: "AI Growth Partners - wdrożenia AI dla firm",
  description:
    "Demo strony dla firmy wdrażającej chatboty AI, automatyzację leadów i procesy AI w małych oraz średnich firmach."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
