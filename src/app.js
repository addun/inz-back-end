const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morganLogger = require('morgan');
const log4js = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth')
const logger = log4js.getLogger();
const app = express();
logger.level = 'debug';

const MONGO_DB_URL = process.env['MONGO_DB_URL'] ? process.env['MONGO_DB_URL'] : 'mongodb://0.0.0.0/inz';

function connectToDB() {
    mongoose
        .connect(MONGO_DB_URL, {autoReconnect: false})
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
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(basicAuth({
    users: {'admin': 'admin'},
    unauthorizedResponse: function (req) {
        if (req.auth) {
            return {
                error: "Incorrect credentials provided"
            };
        } else {
            return {
                error: "No credentials provided"
            }
        }
    }
}));

const form = require('./form/form.router');
const folders = require('./folders/folders.router');
app.use('/forms', form);
app.use('/folders', folders);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({
        "error": "not found"
    })
});

module.exports = app;
