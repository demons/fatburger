FROM node:18-alpine
WORKDIR /code

COPY ./package*.json .

RUN npm install

CMD ["npm", "run", "dev"]
