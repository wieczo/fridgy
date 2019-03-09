FROM arm32v7/node:11.11-stretch

EXPOSE 8080

ENV APP_HOME /fridgy-frontend
ENV NODE_ENV production
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update && apt-get -y install sqlite3 libsqlite3-dev
RUN npm install -g http-server

COPY package*.json ./
RUN npm install

COPY . $APP_HOME
RUN npm run build

CMD ["http-server", "./dist"]