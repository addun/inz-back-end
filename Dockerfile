FROM node:8.9.0

WORKDIR /inz/inz-core/
COPY . .
RUN npm install
EXPOSE 3000

CMD [ "npm", "run","start-prod" ]