FROM node:8

WORKDIR /usr/src/ava

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]