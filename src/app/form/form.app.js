const express = require('express');
const app = express();

app.use(require('./form.controller'));

module.exports = app;