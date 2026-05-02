FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
EXPOSE 3006

CMD ["node_modules/.bin/ts-node", "-r", "tsconfig-paths/register", "src/main.ts"]
