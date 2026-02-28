# Visitor tracking & locations

## How it works

1. **Tracking**  
   On every marketing page load, the client sends a request to `POST /api/track` with the current path. No cookies or personal data are stored.

2. **Location (Vercel)**  
   When the app runs on **Vercel**, the serverless function that handles `/api/track` receives [Vercel geo headers](https://vercel.com/docs/headers/request-headers#x-vercel-ip-country):
   - `x-vercel-ip-country` – 2-letter country code (e.g. US)
   - `x-vercel-ip-country-region` – region/state
   - `x-vercel-ip-city` – city name  

   These are **only available on Vercel Pro and Enterprise**. On Hobby or locally, location fields will be empty; page views are still counted with path and time.

3. **Storage**  
   Each request is stored in the `VisitorLog` table (path, country, countryRegion, city, referrer, createdAt).

4. **Admin**  
   Under **Admin → Visitors** you see:
   - Total page views
   - **Visitors by location** – counts per country
   - **Recent page views** – path and location (city, region, country) with time

## After schema changes

If you added or changed the `VisitorLog` model, run:

```bash
npx prisma generate
npx prisma db push
```

Then restart the dev server so the new client is used.

## Other options (libraries & services)

For Vercel Analytics, Umami, Plausible, and how to show their data in your admin, see **ANALYTICS_OPTIONS.md**.
