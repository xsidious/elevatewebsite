# Vercel environment variables

Add these in **Vercel Dashboard → Your project → Settings → Environment Variables**. Apply to **Production** (and Preview if you want).

## Required

| Name | Value | Notes |
|------|--------|------|
| **DATABASE_URL** | `postgresql://neondb_owner:YOUR_PASSWORD@ep-lucky-smoke-aieie5sx-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` | Your real Neon connection string from [Neon Console](https://console.neon.tech) → project → Connection string (pooled). Copy the full URL. |
| **NEXTAUTH_URL** | `https://your-app.vercel.app` | Your Vercel app URL (no trailing slash). Use the real URL after first deploy. |
| **NEXTAUTH_SECRET** | (random string, e.g. 32+ chars) | Generate with: `openssl rand -base64 32` or any long random string. Required for secure admin login. |

## Optional

| Name | Value | Notes |
|------|--------|------|
| **BLOB_READ_WRITE_TOKEN** | From Vercel Storage → Blob | So project image uploads go to Vercel Blob instead of ephemeral disk. |

## Steps

1. In Vercel: **Settings → Environment Variables**.
2. Click **Add New** for each variable.
3. Paste **Name** and **Value**; leave **Environment** as Production (and add Preview if needed).
4. **Redeploy** the project (Deployments → ⋮ on latest → Redeploy) so the new env vars are used.

After setting `DATABASE_URL`, ensure your Neon database has been set up once (run `npx prisma db push` and `npm run db:seed` from your machine with the same URL in `.env`).
