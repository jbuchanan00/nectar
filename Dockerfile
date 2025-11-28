# Dockerfile.prod
FROM node:alpine3.20 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Start server
FROM node:alpine3.20
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/.svelte-kit ./.svelte-kit
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3002

HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=6 \
  CMD wget -qO- http://127.0.0.1:3002/nectar/health || exit 1

CMD ["node", "build"]
