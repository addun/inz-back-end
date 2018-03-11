FROM node:9.8.0-alpine

WORKDIR /inz/inz-core/
COPY . .
RUN npm install --only=production
EXPOSE 3000

CMD [ "npm", "run","start-prod" ]