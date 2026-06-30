FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS builder
COPY . .
RUN pnpm install
RUN pnpm run build

FROM base AS runner
COPY --from=builder /app /app
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "run", "start", "-w", "@shadow-seek/server"]
