const config = require('config');
const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();

const uri = `mongodb://${config.database.host}/${config.database.name}`;
const dbDConfig = {
    autoReconnect: false

};

function connectToDb() {
    mongoose.connect(uri, dbDConfig)
        .then(value => {
            logger.info(`Connected to the database`);
        })
        .catch(reason => {
            logger.error(`Error while connecting to the MongoDB`);
            setTimeout(reconnect, 5000);
        });
}


mongoose.connection.on('disconnected', () => {
    logger.error(`Disconnected from the database`);
    setTimeout(reconnect, 5000);
});

mongoose.connection.on('reconnected', () => {
    logger.info(`Reconnected with the database`);
});

function reconnect() {
    logger.info(`Trying to reconnect`);
    connectToDb()
}

connectToDb();

module.exports = mongoose;