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
      <StickyCta phone="+1 312-483-6046" ctaText="Contact us" />
      <Suspense fallback={null}>
        <GlobalModals />
      </Suspense>
    </>
  );
}
