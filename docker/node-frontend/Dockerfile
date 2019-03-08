FROM arm32v7/node:11

EXPOSE 8080

ENV APP_HOME /fridy-frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME

VOLUME ["/fridy-frontend"]

RUN apt-get update
RUN apt-get -y install sqlite3 libsqlite3-dev

RUN npm i -g http-server
RUN npm install -g chalk each-async indent-string

RUN npm install
RUN npm run build

CMD ["http-server", "./dist"]