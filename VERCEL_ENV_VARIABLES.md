# Vercel environment variables — copy-paste

Add these in **Vercel Dashboard → Your project → Settings → Environment Variables**.  
Apply to **Production** (and **Preview** if you want staging to use the same DB).

---

## 1. DATABASE_URL

**Name:** `DATABASE_URL`

**Value:** (paste your Neon connection string; example below)
```
postgresql://neondb_owner:npg_jLoYmiAu7HG9@ep-frosty-poetry-aihynatc-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## 2. NEXTAUTH_URL

**Name:** `NEXTAUTH_URL`

**Value:** Your Vercel app URL (no trailing slash). After first deploy, use the URL Vercel gives you, e.g.:
```
https://elevatewebsite.vercel.app
```
or
```
https://your-project-name.vercel.app
```

---

## 3. NEXTAUTH_SECRET

**Name:** `NEXTAUTH_SECRET`

**Value:** A random string (at least 32 characters). Generate one with:
- PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])`
- Or use any long random string, e.g.:
```
your-random-secret-at-least-32-characters-long-here
```

---

## Optional: BLOB_READ_WRITE_TOKEN

**Name:** `BLOB_READ_WRITE_TOKEN`

**Value:** From Vercel Dashboard → Storage → Create Database/Blob → copy the token.  
Only needed if you want project image uploads to persist (otherwise uploads are ephemeral).

---

## After adding variables

1. **Redeploy** in Vercel (Deployments → ⋮ on latest deployment → Redeploy) so the new env vars are used.
2. Your Neon database is already seeded from your local run; the live site will use the same data.
