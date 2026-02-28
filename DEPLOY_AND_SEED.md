# Deploy to GitHub and seed the production database

## 1. Push the latest code to GitHub

From the project root:

```bash
cd c:\Users\FindMeAnywhere\Desktop\tlhomeprotheme
git add -A
git status
git commit -m "Admin dashboard, settings, testimonials, services, image storage docs, deploy and seed guide"
git push origin main
```

If your default branch is `master`, use `git push origin master`. If you get auth errors, use a Personal Access Token or SSH key linked to your GitHub account.

---

## 2. Connect the repo to Vercel (if not already)

1. Go to [vercel.com](https://vercel.com) → Your project (or Import from GitHub).
2. Add environment variables:
   - `DATABASE_URL` = your Neon (or other Postgres) connection string.
   - `BLOB_READ_WRITE_TOKEN` = (optional) from Vercel Storage → Blob, so project image uploads go to Blob instead of ephemeral disk.
   - NextAuth: `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (e.g. `https://your-app.vercel.app`).
3. Deploy. The build runs `prisma generate && next build`.

---

## 3. Seed the Neon database (projects, services, testimonials, settings)

The seed script fills the database with **sample projects** (using Unsplash image URLs only), services, testimonials, site settings, and a default admin user.

**Step 1: Create a `.env` file in the project root** (same folder as `package.json`):

```env
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require"
```

Get the URL from [Neon Dashboard](https://console.neon.tech) → your project → Connection string (use the **pooled** one).

**Step 2: Run from the project root**

```bash
cd c:\Users\FindMeAnywhere\Desktop\tlhomeprotheme
npm run db:setup
```

This runs `prisma generate`, `prisma db push`, and the seed in one go. Or run step by step:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

**If you see "Can't reach database server at `ep-xxx-pooler...`"** — your `.env` has a **placeholder** URL (e.g. from `.env.example`). Replace it with your **real** Neon connection string from [Neon Console](https://console.neon.tech) → your project → **Connection string** (pooled). It should look like `postgresql://neondb_owner:ACTUAL_PASSWORD@ep-XXXXX-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require` (with a real host, not the literal "ep-xxx").

If you see **"Missing DATABASE_URL"**, the `.env` file is missing or not in the project root. If the seed hangs or fails, check that the Neon URL is correct and the database is not paused.

**Optional: set admin password before seeding**

```powershell
$env:ADMIN_SEED_PASSWORD = "YourSecurePassword"
npm run db:seed
```

The seed only creates the admin user if it doesn’t exist.

**Option B: Seed from Vercel (e.g. one-off)**

You can add a one-off script or use Vercel’s “Run command” (if available) with `DATABASE_URL` already set, and run:

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

Or run the same commands from your laptop with `DATABASE_URL` pointing at the same Neon DB.

---

## 4. “Projects that are already on the current website”

The seed includes **sample projects** (e.g. “Modern Kitchen Remodel — Delray Beach”) with Unsplash image URLs. These are placeholders.

To use **real projects from your current site (e.g. tlhomepro.com)**:

1. **Manual**: In Admin → Projects, add each project and paste the image URLs from your current site (WordPress media URLs, etc.). The DB stores only those URLs; no image data is stored in the DB.
2. **Seed**: You can edit `prisma/seed.ts` and replace the `sampleProjects` array with your real project titles, slugs, descriptions, and image URLs (from WordPress or any host). Then run the seed again. Existing projects are upserted by `slug`, so re-running the seed updates them.

Either way, **images stay as URLs only**; the 0.5GB DB is not used for image storage. For new uploads in production, use Vercel Blob (see IMAGE_STORAGE.md).

---

## 5. After seeding

- Open `https://your-app.vercel.app` and confirm projects, services, and testimonials appear.
- Log in at `https://your-app.vercel.app/admin/login` with the seeded admin email (default: `admin@tlhomepro.com`) and the password you set (or `admin123` if you didn’t set `ADMIN_SEED_PASSWORD`). Change the password after first login if needed.
