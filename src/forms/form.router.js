const express = require('express');
const router = express.Router();
const formsController = require('./form.controller');

router
    .get('/', formsController.getForms)
    .post('/', formsController.addForm)

    .get('/:formId/', formsController.getForm)

    .get('/:formId/inputs/', formsController.getFormInputs)

    .get('/:formId/records/', formsController.getFormRecords)

    .get('/records/:recordId/', formsController.getRecord)


    .post('/:formId/records/', formsController.addFormRecord)
    .patch('/records/:recordId/', formsController.updateRecord)


    .delete('/records/:recordId/', formsController.removeRecord)
;

module.exports = router;