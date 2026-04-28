FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
ENV NODE_ENV=production
EXPOSE 3002
CMD ["node_modules/.bin/ts-node", "-r", "tsconfig-paths/register", "src/main.ts"]
