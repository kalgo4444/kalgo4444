# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
# The lockfile is bun.lock, so borrow only the bun binary to install from it; Node 24 still runs everything else.
COPY --from=oven/bun:1.4.4-alpine /usr/local/bin/bun /usr/local/bin/bun
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
# Public URL baked into canonical links, sitemap and social previews at build time.
ARG SITE_URL=http://localhost:3000
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# public/ is empty and may be missing in a fresh clone; the runner stage copies it.
RUN mkdir -p public && npm run build

FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
