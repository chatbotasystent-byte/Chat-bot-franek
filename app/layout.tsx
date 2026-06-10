import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  title: "AI Automatyzacja — Chatbot AI dla firm",
  description:
    "Demo chatbota AI, który odpowiada klientom, zbiera leady i zapisuje zapytania do Google Sheets.",
  icons: {
    icon: [
      { url: "/favicon.png?v=6", type: "image/png" }
    ],
    shortcut: "/favicon.ico?v=6",
    apple: "/favicon.png?v=6"
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
