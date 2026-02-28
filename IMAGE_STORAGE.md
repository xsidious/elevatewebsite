# Image storage & database usage (0.5GB limit)

Your database (e.g. Neon) has a **0.5GB** limit. This app is designed so **images never live in the database**—only **URLs** (short text strings) are stored. That keeps DB size small.

## How it works

- **Database**: Stores only text: project titles, descriptions, and **image URLs** (e.g. `https://....blob.vercel-storage.com/...` or `https://images.unsplash.com/...`). No image binary data.
- **Actual image files**: Stored **outside** the DB—either on Vercel Blob, Unsplash (links), or your own CDN.

## Options for project images

### 1. Vercel Blob (recommended for production)

When you set `BLOB_READ_WRITE_TOKEN` in your environment (Vercel project → Storage → Blob → env var), the admin project form uploads images to **Vercel Blob**. The DB only stores the returned URL.

- No image data in the DB; 0.5GB is for tables and text only.
- Blob has its own storage quota (see Vercel pricing).
- **Setup**: Vercel project → Storage → Create Blob store → copy the token into Environment Variables as `BLOB_READ_WRITE_TOKEN`. Redeploy.

### 2. External URLs only (no uploads)

Use links to images hosted elsewhere (e.g. Unsplash, your WordPress/media server, Cloudinary). In the admin, when adding/editing a project you can use “featured image URL” and “gallery image URLs” if the form supports pasting URLs, or rely on the seed data that uses Unsplash URLs.

- **Seed**: The seed script uses **Unsplash URLs** only. No files are stored; the DB only gets short URL strings.

### 3. Local `public/uploads` (dev only)

If `BLOB_READ_WRITE_TOKEN` is **not** set, uploads go to `public/uploads/` on the server. This is fine for local dev, but on Vercel the filesystem is ephemeral—uploads are lost on redeploy. So for production, use Blob or external URLs.

## Summary

| Where images live        | DB impact   | Use case              |
|--------------------------|------------|------------------------|
| Vercel Blob (URL in DB)  | URLs only  | Production uploads     |
| Unsplash / external URL  | URLs only  | Seed, link-only images |
| `public/uploads`         | None       | Local dev only        |

**Bottom line**: You do not use database space for image bytes. The 0.5GB is for app data (projects, services, testimonials, submissions, etc.). Use Vercel Blob or external URLs for images.
