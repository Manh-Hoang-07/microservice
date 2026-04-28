FROM node:20-alpine
WORKDIR /app

# Install deps first (cache layer)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3003

CMD ["npx", "ts-node", \
     "--project", "apps/storage-service/tsconfig.json", \
     "--require", "tsconfig-paths/register", \
     "apps/storage-service/src/main.ts"]
