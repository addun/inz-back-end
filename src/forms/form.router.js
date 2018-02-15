const express = require('express');
const router = express.Router();
const controller = require('./form.controller');

router
    .get('/', controller.getFolderTree)
    .get('/:formId/', controller.getForm)
    .get('/:formId/inputs/', controller.getFormInputs)
    .get('/:formId/records/', controller.getFormRecords)
    .get('/records/:recordId/', controller.getRecord)

    .post('/', controller.addForm)
    .post('/:formId/records/', controller.addFormRecord)
    .post('/records/:recordId/', controller.updateRecord)


    .delete('/records/:recordId/', controller.removeRecord)
;

module.exports = router;