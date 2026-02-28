# Database hosting for TL Home Pro

The site **requires a database** for projects, services, blog posts, testimonials, and the admin dashboard. Set `DATABASE_URL` in your environment (local `.env` and Vercel/hosting env vars).

---

## Option 1: cPanel (MySQL)

cPanel usually provides **MySQL** or **MariaDB**. Use that.

### 1. Create the database in cPanel

1. Log in to **cPanel**.
2. Open **MySQL® Databases** (or **MariaDB**).
3. **Create a new database** (e.g. `tlhomepro`). Note the full name (often `cpaneluser_tlhomepro`).
4. **Create a database user** with a strong password.
5. **Add the user to the database** with **All Privileges**.
6. Note:
   - **Database name**
   - **Username** (often `cpaneluser_dbuser`)
   - **Password**
   - **Host** (often `localhost`; sometimes your server hostname).

### 2. Connection URL format

```text
mysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME
```

Example:

```text
mysql://cpaneluser_tlhome:YourPassword123@localhost:3306/cpaneluser_tlhomepro
```

If your host uses a remote hostname:

```text
mysql://cpaneluser_tlhome:YourPassword123@mysql.yourdomain.com:3306/cpaneluser_tlhomepro
```

Use **one** line; replace `USERNAME`, `PASSWORD`, `HOST`, and `DATABASE_NAME` with your values.  
If the password has special characters, URL-encode them (e.g. `@` → `%40`, `#` → `%23`).

### 3. Switch the project to MySQL

Edit **`prisma/schema.prisma`** and change the datasource to MySQL:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Install the MySQL client (only needed for Prisma to talk to MySQL):

```bash
npm install @prisma/client
# Prisma uses the mysql2 driver for MySQL
```

Set your URL in `.env` (never commit this file):

```env
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME"
```

Then create the tables and seed:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

After that, deploy the app on cPanel (Node.js app or similar) and set the same `DATABASE_URL` in the app’s environment (cPanel env vars or `.env`).

---

## Option 2: Vercel + hosted database

Vercel doesn’t keep a local SQLite file, so you need a **hosted** database.

### Recommended providers (free tiers)

| Provider        | Type       | Notes                    |
|----------------|------------|---------------------------|
| **Vercel Postgres** | PostgreSQL | In Vercel dashboard, one-click |
| **Neon**       | PostgreSQL | Free tier, good for Vercel |
| **PlanetScale**| MySQL      | Free tier, MySQL-compatible |
| **Supabase**   | PostgreSQL | Free tier, includes auth/storage |

### Steps (e.g. Neon or Vercel Postgres)

1. Sign up at [Neon](https://neon.tech) or use **Storage → Postgres** in the Vercel dashboard.
2. Create a database and copy the **connection string** (e.g. `postgresql://user:pass@host/db?sslmode=require`).
3. In **`prisma/schema.prisma`** set:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

4. In the Vercel project, add **Environment variable**:
   - Name: `DATABASE_URL`
   - Value: your connection string (often with `?sslmode=require` or `?pgbouncer=true` for serverless).

5. Locally, put the same URL in `.env`, then:

   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

6. Redeploy on Vercel so the new env and schema are used.

---

## Option 3: Keep SQLite (local / VPS / Docker)

- **Local:** Already set in `.env.example`: `DATABASE_URL="file:./prisma/dev.db"`.
- **Docker:** Use a volume so the DB file persists (e.g. `file:/app/data/dev.db`).
- **VPS or a server with disk:** Point `DATABASE_URL` to a path where the app can read/write, e.g. `file:/var/app/data/dev.db`.

SQLite is **not** suitable on **Vercel** or other serverless hosts (no persistent filesystem).

---

## Summary

| Where you host the site | Where to host the database | Provider in Prisma |
|-------------------------|----------------------------|---------------------|
| **cPanel**              | MySQL from cPanel          | `provider = "mysql"` |
| **Vercel**              | Neon / Vercel Postgres / Supabase | `provider = "postgresql"` |
| **VPS / Docker / local**| SQLite file or MySQL/Postgres on same server | `provider = "sqlite"` or `mysql` / `postgresql` |

After changing the provider, always run:

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

and set `DATABASE_URL` in the environment where the app runs.
