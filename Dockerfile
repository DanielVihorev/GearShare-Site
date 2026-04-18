# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Serve stage ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Install serve globally so it is available as a binary
RUN npm install -g serve@14

# Copy only the built output from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
