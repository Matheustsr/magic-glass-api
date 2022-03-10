FROM node:14.17.0-alpine
WORKDIR /app

ARG NPM_TOKEN
ARG NODE_ENV
ARG BUGSNAG_KEY
ENV BUGSNAG_KEY=${BUGSNAG_KEY}
ENV NPM_TOKEN=${NPM_TOKEN}
ENV NODE_ENV=${NODE_ENV}

RUN apk add chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build