FROM arm32v7/node:11

EXPOSE 8081

ENV APP_HOME /fridgy-backend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD ./src/server.js $APP_HOME
ADD ./test.sqlite $APP_HOME

RUN apt-get update && apt-get -y install sqlite3 libsqlite3-dev
RUN rm -rf node_modules

RUN npm install express cors body-parser sequelize epilogue
RUN npm install -g chalk each-async indent-string

CMD ["node", "server.js"]
