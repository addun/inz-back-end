process.env['NODE_CONFIG_DIR'] = process.cwd() + '/src/configuration';
const config = require('config');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morganLogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const logger = log4js.getLogger();
const app = express();
const boom = require('boom');
logger.level = config.logger.level;

require('./middleware/mongoose');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('./middleware/cors'));
app.options("/*", function (req, res, next) {
    res.sendStatus(200);
});
app.use(require('./middleware/basicAuth'));

app.get("/auth", function (req, res, next) {
    res.status(200);
    res.send({
        credentials: "OK"
    })
});

app.use('/forms', require('./app/form/form.app'));
app.use('/folders', require('./app/folder/folder.app'));
app.use(function (req, res, next) {
    const err = boom.notFound('This page does not existing');
    next(err);
});
app.use(function (err, req, res, next) {
    if (boom.isBoom(err)) {
        res.status(err.output.statusCode);
        res.send(err.output.payload);
    } else {
        res.status(500);
        res.send(err);
    }
});

module.exports = app;
