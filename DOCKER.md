# Run TL Home Pro on localhost with Docker

Runs the app and a PostgreSQL database in containers. The DB is seeded automatically on first start.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

## Commands

**Build and run (app on http://localhost:3000):**

```bash
docker compose up --build
```

Or in the background:

```bash
docker compose up --build -d
```

**Stop:**

```bash
docker compose down
```

**Stop and remove database data:**

```bash
docker compose down -v
```

## What runs

- **postgres** – PostgreSQL 16 on port 5432 (credentials: user `tlhome`, password `tlhome`, database `tlhome`)
- **app** – Next.js app on port 3000. On start it runs `prisma db push` and `npm run db:seed`, then starts the server.

## Admin login

After the first run, use the seeded admin user:

- URL: http://localhost:3000/admin/login  
- Email: `admin@tlhomepro.com`  
- Password: `admin123` (change in production)
