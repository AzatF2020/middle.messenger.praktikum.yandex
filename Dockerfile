FROM node:20-alpine AS base

RUN apk update && apk add bash \
    && npm install -g typescript

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.27.5 AS prod

COPY --from=base /app/dist /bin/www

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
