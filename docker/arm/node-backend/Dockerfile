FROM arm32v7/node:11.11-stretch

EXPOSE 8081

ENV APP_HOME /fridgy-backend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update && apt-get -y install sqlite3 libsqlite3-dev

COPY package.json ./
COPY package-lock.json ./
COPY ./src/server.js ./

# Make sure NODE_ENV is NOT set to production
# this will brake npm install and building vue
RUN npm install

CMD ["node", "server.js"]
