FROM arm32v7/node:11

EXPOSE 8080

ENV APP_HOME /fridgy-frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME

RUN apt-get update && apt-get -y install sqlite3 libsqlite3-dev

RUN rm -rf node_modules
RUN npm i -g http-server

RUN npm install
RUN npm run build
CMD ["http-server", "./dist"]