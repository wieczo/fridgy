FROM node:4-onbuild

EXPOSE 8080

CMD ["npm", "install"]
CMD ["npm", "install -g http-server"]

ENV APP_HOME /fridy-frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

VOLUME ["/fridy-frontend"]

CMD ["npm", "run build"]
CMD ["http-server", "./dist"]