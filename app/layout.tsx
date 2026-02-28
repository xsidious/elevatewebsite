import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELEVATE | Home Remodel & Renovation | South Florida",
  description:
    "ELEVATE your space. Custom renovations, kitchens, bathrooms, and full interior remodels. Quality work, clear communication. Free estimates. Licensed & insured.",
  openGraph: {
    title: "ELEVATE | Home Remodel & Renovation | South Florida",
    description:
      "Elevating your vision with quality renovations. Free estimate, no obligation.",
  },
  // Prevent any "generator" or tool attribution in meta tags
  other: {
    generator: "Next.js",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
