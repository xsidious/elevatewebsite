# TL Home Pro - Docker image for localhost (PostgreSQL)
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies (devDependencies for prisma, tsx, build)
COPY package.json package-lock.json* ./
RUN npm ci

# Prisma schema and generate client (no DB at build time)
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN npx prisma generate

# App source and build (dummy DATABASE_URL for build; real one at runtime)
COPY . .
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN npm run build

ENV NODE_ENV=production

# Entrypoint runs db push + seed then start (DB URL from docker-compose)
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "run", "start"]
