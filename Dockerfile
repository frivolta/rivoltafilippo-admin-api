FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY --from=development /usr/src/app ./
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/src/main"]