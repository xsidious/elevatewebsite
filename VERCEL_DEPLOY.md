# Deploying to Vercel with Neon PostgreSQL

## 1. Set the database URL in Vercel

1. In the [Vercel dashboard](https://vercel.com), open your project.
2. Go to **Settings → Environment Variables**.
3. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** your Neon connection string, e.g.  
     `postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require`
   - Apply to **Production**, **Preview**, and **Development** if you use them.

## 2. Build and deploy

Vercel will run `npm run build`, which runs `prisma generate` (via postinstall if configured). The app connects to the database at **runtime** (when pages are requested), so the build will succeed as long as `DATABASE_URL` is set.

If your build runs Prisma migrations or seed (e.g. in a build script), ensure `DATABASE_URL` is available during the build step.

## 3. First-time database setup (run locally)

Before the site can show content, create tables and seed data **once** from your machine:

```bash
# In .env or .env.local, set:
# DATABASE_URL="postgresql://your-neon-url?sslmode=require"

npx prisma generate
npx prisma db push
npm run db:seed
```

After that, the Vercel deployment will read from the same Neon database.

## 4. Optional: NextAuth and admin

For the admin dashboard login, also set in Vercel:

- `NEXTAUTH_URL` = your production URL (e.g. `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET` = a random string (e.g. `openssl rand -base64 32`)
