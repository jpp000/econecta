FROM node:alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm i -g pnpm
RUN pnpm i

COPY . .

RUN pnpm run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/conf.d

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
