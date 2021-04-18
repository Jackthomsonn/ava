FROM node:10

WORKDIR /app/ava

COPY ./package.json .

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/ava/ava-ai-310408-185f465d8c5e.json

RUN npm i

EXPOSE 8080

CMD [ "npm", "start" ]