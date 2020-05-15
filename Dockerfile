FROM circleci/node:latest-browsers as builder

WORKDIR /usr/src/app/
USER root
COPY ./config ./config
COPY ./src ./src
COPY package.json project.config.json .babelrc ./
RUN cd /usr/src/app/src/pages/views/samples/vue-hot-update && npm install && npm run build:reus

FROM nodejs:10.17-alpine
LABEL maintainer="guozhi5658@gmail.com"

RUN mkdir /app
WORKDIR /app
COPY --from=builder /usr/src/app/ /app/
RUN npm install && npm run build

EXPOSE 8081

CMD ["npm", "run", "deploy"]
