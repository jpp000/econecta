FROM node:alpine AS build

WORKDIR /app

COPY server/package.json ./
COPY server/pnpm-lock.yaml ./
COPY server/tsconfig.json ./
COPY server/tsconfig.build.json ./
COPY server/nest-cli.json ./

RUN npm i -g pnpm 

RUN pnpm install --frozen-lockfile

RUN pnpm build

FROM node:alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main.js"]
