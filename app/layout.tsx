import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
