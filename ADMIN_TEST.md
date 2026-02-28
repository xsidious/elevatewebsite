# Testing admin locally

## 1. Environment

Create `.env.local` in the project root (do not commit it):

```env
DATABASE_URL="postgresql://your-neon-url?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="any-random-string-at-least-32-characters-long"
```

## 2. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 3. Log in to admin

1. Go to **http://localhost:3000/admin/login**
2. Sign in with the seeded admin user:
   - **Email:** `admin@tlhomepro.com`
   - **Password:** `admin123` (or the value you set with `ADMIN_SEED_PASSWORD` when running `npm run db:seed`)

## 4. Test adding a project

1. After login you’re on the **Dashboard**. Click **Projects** in the sidebar.
2. Click **Add project**.
3. Fill in:
   - **Title** (e.g. "Test Kitchen Remodel")
   - **Slug** (optional; it’s auto-generated from the title if left blank)
   - **Short description**, **Full description**
   - **Category** (e.g. Kitchen Remodel)
   - **Location** (optional)
   - **Featured image** (optional; upload an image)
   - **Gallery** (optional; multiple images)
   - **Published** (check to show on the public site)
4. Click **Save** (or the submit button).
5. You should be redirected to **Projects** and see the new project.
6. Open the public site: **http://localhost:3000/projects** — your new project should appear there (if published).

## 5. Other admin features

- **Edit project:** On the projects list, click **Edit** next to a project.
- **Delete project:** Use the delete control next to a project (confirm when prompted).
- **Blog:** Use **Blog** in the sidebar to add or edit blog posts.
- **View site:** Use **View site** in the sidebar to open the public homepage.

## 6. If login fails

- Ensure the database is seeded: `npm run db:seed` (with `DATABASE_URL` set).
- The seed creates user `admin@tlhomepro.com` with password `admin123` (or `ADMIN_SEED_PASSWORD` if set).
