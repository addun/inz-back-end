process.env['NODE_CONFIG_DIR'] = process.cwd() + '/src/configuration';
const config = require('config');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morganLogger = require('morgan');
const log4js = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
const logger = log4js.getLogger();
const app = express();
logger.level = config.logger.level;

function connectToDB() {
    mongoose
        .connect('mongodb://' + config.database.host + '/' + config.database.name, {autoReconnect: false})
        .then(_ => logger.info("Connected to MongoDB"))
        .catch(_ => {
            logger.error("Error while connecting to the MongoDB");
            logger.info("Trying to reconnect");
            setTimeout(connectToDB, 5000);
        });
}

mongoose.connection.on('disconnected', () => {
    logger.error(`Disconnected from database`);
    logger.info("Trying to reconnect");
    setTimeout(connectToDB, 5000);
});
connectToDB();


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.options("/*", function (req, res, next) {
    res.sendStatus(200);
});

app.use(basicAuth({
    users: {[config.auth.user]: config.auth.password},
    unauthorizedResponse: function (req) {
        if (req.auth) {
            return {error: "Incorrect credentials provided"};
        } else {
            return {error: "No credentials provided"}
        }
    }
}));

app.get("/auth", function (req, res, next) {
    res.status(200);
    res.send({
        credentials: "OK"
    })
});

const formApp = require('./form/form.app');
const folderApp = require('./folder/folder.app');
app.use('/forms', formApp);
app.use('/folders', folderApp);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // render the error page
    try {
        res.status(err.output.statusCode);
        res.send(err.output.payload);
    } catch (e) {
        res.status(500);
        res.send(err);
    }
});

module.exports = app;
