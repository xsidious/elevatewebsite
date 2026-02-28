# Visitor tracking – libraries and options

You have **three ways** to track visitors; you can use one or combine them.

---

## 1. Vercel Web Analytics (added)

**Library:** `@vercel/analytics`  
**Where data shows:** Vercel Dashboard → your project → **Analytics** tab.

- **Setup:** Already added to the marketing layout. Enable **Web Analytics** in the [Vercel project settings](https://vercel.com/dashboard) (Settings → Analytics).
- **Tracks:** Page views on the public site (no admin pages). No cookies, privacy-friendly.
- **Viewing:** All stats and charts are in Vercel’s UI (page views, top pages, referrers, countries, devices). There is no API to pull this into your own admin dashboard.

Good if you’re on Vercel and only need the built-in dashboard.

---

## 2. Your own admin (current)

**What you have:** Custom tracking via `/api/track` + `VisitorLog` in your DB.

- **Tracks:** Each page view (path, time). On Vercel Pro/Enterprise you also get **country, region, city** from Vercel’s geo headers.
- **Viewing:** **Admin → Visitors**: page view count, visitors by location, recent page views with location.

Good when you want everything inside your app and don’t need a third-party dashboard.

---

## 3. Third-party analytics with an API (e.g. Umami)

**Libraries/services:** Umami, Plausible, PostHog, Google Analytics, etc.

| Service        | Library / integration      | Show in your admin? |
|----------------|----------------------------|----------------------|
| **Umami**      | Script or next script tag  | **Yes** – has an API you can call from your admin to show stats. |
| **Plausible**  | `next-plausible`           | No – use their dashboard only. |
| **PostHog**    | `posthog-js`               | Yes – API and embed options. |
| **Google Analytics (GA4)** | `react-ga4` or gtag | Yes – Reporting API. |

**Umami** (self-hosted or [Umami Cloud](https://umami.is)):

- Privacy-friendly, no cookies.
- You add their script to your site; they collect page views and basic stats.
- They expose an [API](https://umami.is/docs/api/api-client) (e.g. `getWebsiteStats`, `getWebsitePageviews`). You can call it from your **Admin → Visitors** page (or a new “Analytics” section) to show visitor counts, top pages, countries, etc. inside your dashboard.

If you want a **library that tracks visitors and also lets you show stats in your admin**, Umami + their API is a good fit. If you only want “a library that tracks,” Vercel Analytics (option 1) is the simplest.

---

## Summary

- **Just need a dashboard somewhere:** Use **Vercel Analytics** (already integrated) and enable it in Vercel.
- **Want stats inside your admin:** Keep your **custom VisitorLog** (and optionally add **Umami** and call their API from your admin to show their stats too).
- **Want a dedicated analytics product:** Add **Plausible** or **Umami** (or another) and use their dashboard; add Umami’s API only if you also want to display their data in your app.
