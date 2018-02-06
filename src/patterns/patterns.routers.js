const express = require('express');
const router = express.Router();
const PatternModel = require('./patterns.controllers');

router
    .get('/', function (req, res) {
        PatternModel.getAll(req, res);
    })
    .post('/', function (req, res) {
        PatternModel.addNew(req, res);
    })
;

module.exports = router;