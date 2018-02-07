const express = require('express');
const router = express.Router();
const PatternModel = require('./patterns.controllers');

router
    .get('/', PatternModel.getAll)

    .post('/', PatternModel.addNew)
;

module.exports = router;