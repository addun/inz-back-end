const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morganLogger = require('morgan');
const log4js = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
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

['disconnected', 'close'].forEach(element => {
    mongoose.connection.on(element, () => {
        logger.error(`${element} from MongoDB`);
        connectToDB();
    });
});


connectToDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

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
    res.render('error');
});

module.exports = app;
