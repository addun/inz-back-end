FROM node:9.8.0

ENV MONGO_DB_URL='mongodb://0.0.0.0/inz'

WORKDIR /inz/inz-core/
COPY . .
RUN npm install --only=production
EXPOSE 3000

CMD [ "npm", "run","start-prod" ]