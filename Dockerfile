# base image
FROM node:alpine

WORKDIR /usr/src

COPY package.json .
ENV NODE=ENV=ci

RUN yarn install

COPY . .