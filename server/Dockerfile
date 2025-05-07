FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./

RUN npm i -g pnpm 

RUN pnpm install --frozen-lockfile

RUN pnpm build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install --frozen-lockfile --prod

CMD ["node", "dist/main.js"]
