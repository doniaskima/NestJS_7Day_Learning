FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./


RUN npm install -g npm

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./


RUN npm install -g npm

RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]