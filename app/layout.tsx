import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ogimage-api — OG Image Generator API",
  description:
    "Generate beautiful social cards for Twitter, Facebook, LinkedIn and more with a single API call. No design tools required.",
  openGraph: {
    title: "ogimage-api — OG Image Generator API",
    description: "Generate beautiful social cards with a single API call.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
