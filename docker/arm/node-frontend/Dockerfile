FROM arm32v7/node:11.11-stretch

EXPOSE 8080

ENV APP_HOME /fridgy-frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update && apt-get -y install sqlite3 libsqlite3-dev
RUN npm install -g http-server

COPY package.json ./
COPY package-lock.json ./
# Make sure NODE_ENV is NOT set to production
# this will brake npm install and building vue
RUN npm install 

COPY . $APP_HOME
RUN npm run build

CMD ["http-server", "./dist"]