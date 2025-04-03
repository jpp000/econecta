FROM node:alpine

WORKDIR /app

COPY ./client/package.json ./client/pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host"]
