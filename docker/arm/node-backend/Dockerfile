FROM arm32v7/node:11.11-stretch

EXPOSE 8081

ENV APP_HOME /fridgy-backend
ENV NODE_ENV=production
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update && apt-get -y install sqlite3 libsqlite3-dev

COPY package*.json ./
COPY ./src/server.js ./

RUN npm install

CMD ["node", "server.js"]
