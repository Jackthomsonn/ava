FROM node:8

WORKDIR /usr/src/ava/

COPY . .

RUN npm install && npm install typescript -g && tsc

EXPOSE 8080

CMD [ "npm", "start" ]