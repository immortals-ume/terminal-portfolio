FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_GITHUB_USERNAME
ARG NEXT_PUBLIC_FULL_NAME
ARG NEXT_PUBLIC_EMAIL
ARG NEXT_PUBLIC_WEBSITE
ARG NEXT_PUBLIC_CREDLY_USER_ID
ARG NEXT_PUBLIC_FEATURED_REPOS
ARG NEXT_PUBLIC_ENABLE_MATRIX_BACKGROUND=true
ARG NEXT_PUBLIC_DEBUG_MODE=false

ENV NEXT_PUBLIC_GITHUB_USERNAME=$NEXT_PUBLIC_GITHUB_USERNAME
ENV NEXT_PUBLIC_FULL_NAME=$NEXT_PUBLIC_FULL_NAME
ENV NEXT_PUBLIC_EMAIL=$NEXT_PUBLIC_EMAIL
ENV NEXT_PUBLIC_WEBSITE=$NEXT_PUBLIC_WEBSITE
ENV NEXT_PUBLIC_CREDLY_USER_ID=$NEXT_PUBLIC_CREDLY_USER_ID
ENV NEXT_PUBLIC_FEATURED_REPOS=$NEXT_PUBLIC_FEATURED_REPOS
ENV NEXT_PUBLIC_ENABLE_MATRIX_BACKGROUND=$NEXT_PUBLIC_ENABLE_MATRIX_BACKGROUND
ENV NEXT_PUBLIC_DEBUG_MODE=$NEXT_PUBLIC_DEBUG_MODE
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
