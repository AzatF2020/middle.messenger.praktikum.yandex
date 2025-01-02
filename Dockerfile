FROM node:20.18-alpine AS builder

RUN apk update && apk add bash

WORKDIR /var/www/app

COPY package*.json .

RUN npm i --no-audit --no-fund

COPY . .

RUN npm run build

FROM builder AS development

RUN npm install

CMD ["npm", "run", "dev"]


