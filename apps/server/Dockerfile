FROM node:alpine AS build

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./

RUN npm i -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:alpine AS production

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --prod

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]