import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Clappic - AI Viral Photocard Generator",
    template: "%s | Clappic",
  },
  description:
    "Generate viral social media posts, memes, and savage replies instantly with AI. Create Twitter-style threads, chat screenshots, and more.",
  keywords: [
    "AI",
    "Social Media",
    "Viral",
    "Generator",
    "Meme",
    "Twitter",
    "Instagram",
    "Photocard",
  ],
  authors: [{ name: "Antigravity" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clappic.app",
    title: "Clappic - AI Viral Photocard Generator",
    description: "Turn ideas into viral photocards instantly.",
    siteName: "Clappic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clappic - AI Viral Photocard Generator",
    description: "Turn ideas into viral photocards instantly.",
    creator: "@antigravity",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans bg-background text-foreground container mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
