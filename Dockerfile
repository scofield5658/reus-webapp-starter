FROM nodejs:10.17-alpine
LABEL maintainer="guozhi5658@gmail.com"

RUN mkdir -p /opt/app
ADD . /opt/app
RUN cd /opt/app && npm install && npm run build

WORKDIR /opt/app
EXPOSE 8081

CMD ["npm", "run", "deploy"]
