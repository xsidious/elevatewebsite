"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Calls /api/track with the current path. Runs only on the client (marketing layout).
 * On Vercel, the API route receives geo headers (country, region, city) and we store them.
 */
export function VisitorTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // Avoid duplicate tracks for the same path in one session
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;

    const referrer = typeof document !== "undefined" ? document.referrer || undefined : undefined;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: referrer || undefined }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
