FROM arm32v7/node:11

EXPOSE 8080

ENV APP_HOME /fridy-frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME

VOLUME ["/fridy-frontend"]

RUN npm install
RUN npm i http-server -g

CMD ["npm", "run build"]
CMD ["http-server", "./dist"]