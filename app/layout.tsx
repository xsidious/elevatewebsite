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
  title: "ELEVATE | Painting & Remodeling | North Shore & Chicagoland",
  description:
    "Professional painting and remodeling for residential and commercial. Interior & exterior painting, kitchens, bathrooms, basements, decks, general contracting. Deerfield, IL. +1 312-483-6046.",
  openGraph: {
    title: "ELEVATE | Painting & Remodeling",
    description:
      "Built on experience, focused on results. Painting, remodeling, and general contracting. North Shore & Chicagoland.",
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
