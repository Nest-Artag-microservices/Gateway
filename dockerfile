FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package.json ./


RUN pnpm install

COPY . .

EXPOSE 54123