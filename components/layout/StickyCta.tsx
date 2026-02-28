"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type StickyCtaProps = {
  phone?: string;
  ctaText?: string;
};

export function StickyCta({ phone, ctaText = "Get a free estimate" }: StickyCtaProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const openQuoteModal = () => {
    const base = pathname || "/";
    router.push(base + (base.includes("?") ? "&" : "?") + "quote=1");
  };

  if (pathname?.startsWith("/admin") || !visible) return null;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-[80%] max-w-2xl bg-white/95 backdrop-blur-sm border border-b-0 border-gray-200 rounded-t-3xl shadow-lg">
      <div className="px-4 py-2.5 flex items-center justify-between gap-3">
        <span className="text-gray-600 text-xs sm:text-sm truncate">{ctaText}</span>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {phone && (
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="text-primary-500 hover:text-primary-600 text-xs sm:text-sm font-medium transition hidden sm:inline"
            >
              {phone}
            </a>
          )}
          <button
            type="button"
            onClick={openQuoteModal}
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-500 text-gray-900 text-xs sm:text-sm font-semibold rounded-full hover:bg-primary-600 transition"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
