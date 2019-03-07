FROM node:4-onbuild
# replace this with your application's default port
EXPOSE 8081

ENV APP_HOME /fridy-backend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

VOLUME ["/fridy-backend"]

CMD ["node", "/src/server.js"]
