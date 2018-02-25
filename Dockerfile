FROM node:8.9.0

#RUN add-apt-repository ppa:ubuntu-toolchain-r/test
RUN apt-get update -y
RUN apt-get install -y libstdc++-5-dev

WORKDIR /app
EXPOSE 3000
CMD [ "npm", "start" ]