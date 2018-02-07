const express = require('express');
const router = express.Router();
const controllers = require('./forms.controllers');

router
    .get('/', controllers.getAll)
    .post('/', controllers.addNew)
    .post('/:formId/data', controllers.addData)
;

module.exports = router;