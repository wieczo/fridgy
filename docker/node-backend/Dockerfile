FROM arm32v7/node:11

EXPOSE 8081

ENV APP_HOME /fridy-backend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD ./src/server.js $APP_HOME
ADD ./test.sqlite $APP_HOME

VOLUME ["/fridy-backend"]

RUN npm install express cors body-parser sequelize epilogue
CMD ["node", "server.js"]
