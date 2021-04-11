FROM node:10

WORKDIR /app/ava

COPY ./package.json .

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/ava/ava-ai-310408-2af647de14ce.json

RUN npm i

EXPOSE 8080

CMD [ "npm", "start" ]