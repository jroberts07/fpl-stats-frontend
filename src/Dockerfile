FROM node:12.2.0-alpine

ADD app/yarn.lock /yarn.lock
ADD app/package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /usr/src/app
ADD app /usr/src/app

EXPOSE 3000

CMD ["yarn", "start"]