import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: "AI Growth Partners | Chatbot AI dla firm",
  description:
    "Demo chatbota AI dla firm usługowych. Bot odpowiada klientom 24/7, zbiera leady i może zapisywać zapytania do Google Sheets.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png"
  }
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
