FROM arm32v7/node:11.11-stretch

EXPOSE 8081

ENV APP_HOME /fridgy-backend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update && apt-get -y install sqlite3 libsqlite3-dev

COPY package*.json $APP_HOME
COPY ./src/server.js $APP_HOME
COPY ./test.sqlite $APP_HOME

RUN npm install

CMD ["node", "server.js"]
