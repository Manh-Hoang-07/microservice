FROM node:20-alpine
WORKDIR /app

# Install deps first (cache layer)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 3006

CMD ["npx", "ts-node", \
     "--project", "apps/bff-service/tsconfig.json", \
     "--require", "tsconfig-paths/register", \
     "apps/bff-service/src/main.ts"]
