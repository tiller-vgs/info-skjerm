FROM node:22-alpine
WORKDIR /app

# Copy manifests and schema first for layer caching
COPY package*.json tsconfig.json prisma.config.ts ./
COPY prisma ./prisma/

# Install all deps (including devDeps — tsx is required at runtime)
RUN npm ci

# Generate Prisma client into prisma/generated/client
# DATABASE_URL is not used during generate, but prisma.config.ts's env() helper
# throws at config-load time if the var is absent — supply a placeholder.
RUN npx prisma generate

# Copy source after dependencies to maximise cache hits
COPY src ./src

EXPOSE 3000

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
