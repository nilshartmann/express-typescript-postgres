FROM node:8.4-alpine

WORKDIR /app

ADD package.json yarn.lock /app/

RUN yarn install

ADD . .

RUN yarn tsc
CMD ["node", "dist/index.js"]

