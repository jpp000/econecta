FROM node:alpine AS dev

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable && pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]

FROM node:alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm build

FROM nginx:alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html

# Copia uma configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
