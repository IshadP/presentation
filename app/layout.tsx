import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jet",
  subsets: ["latin"],
  display: "swap",
});

import LenisProvider from "./components/LenisProvider";

export const metadata: Metadata = {
  title: "Ishad Pande — Product Designer & Developer",
  description: "Interactive Multi-Topic Slide Presentation Deck built with Ishad Pande Design Tokens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased bg-bg-default text-text-primary flex flex-col min-h-screen overflow-x-hidden`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}


