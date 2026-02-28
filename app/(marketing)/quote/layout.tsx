import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quote Calculator | ELEVATE | Free Estimate",
  description: "Get a rough estimate for your home renovation project. Kitchen, bathroom, and full remodel price ranges.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
