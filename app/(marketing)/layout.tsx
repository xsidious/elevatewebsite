import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { GlobalModals } from "@/components/GlobalModals";
import { VisitorTracker } from "@/components/VisitorTracker";
import { Suspense } from "react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VisitorTracker />
      <Analytics />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyCta phone="(561) 247-3693" ctaText="Get a free estimate" />
      <Suspense fallback={null}>
        <GlobalModals />
      </Suspense>
    </>
  );
}
