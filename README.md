# ELEVATE Website

Modern, high-converting Next.js marketing site for ELEVATE — a South Florida home remodeling, renovation, and restoration company.

## Features

- **Public site**: Hero, trust bar, about, services, process, projects gallery, testimonials, contact form
- **Projects**: Admin can add projects with featured image and gallery; they appear on `/projects` and each project has its own page with prev/next
- **Admin dashboard**: Protected at `/admin` (login at `/admin/login`). Manage projects (create, edit, delete, image uploads)
- **High conversion**: Sticky CTA bar, trust badges, multiple CTAs, contact form with validation

## Tech stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS
- Prisma + SQLite (or switch to PostgreSQL via env)
- NextAuth.js (credentials) for admin

## Setup

1. **Install and database**
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

2. **Environment**
   - Copy `.env.example` to `.env.local`
   - Set `NEXTAUTH_SECRET` (min 32 chars) and `NEXTAUTH_URL` (e.g. `http://localhost:3000`)

3. **Run**
   ```bash
   npm run dev
   ```
   - Site: http://localhost:3000
   - Admin: http://localhost:3000/admin (after login)
   - Default admin: `admin@tlhomepro.com` / `admin123` (change in production via `ADMIN_SEED_PASSWORD` or create a new user)

## Scripts

- `npm run dev` — development with Turbopack
- `npm run build` / `npm run start` — production
- `npm run db:seed` — re-run seed (services, testimonials, site settings, admin user)
- `npm run db:studio` — Prisma Studio

## Contact form

Submissions hit `POST /api/contact`. The handler validates and logs; to send email, add Resend/SendGrid (or store in DB) in `app/api/contact/route.ts`.

## Project images

Uploads go to `public/uploads/`. For production you may switch to Vercel Blob or S3 in `lib/uploads.ts`.
