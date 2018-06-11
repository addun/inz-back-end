const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const formService = require('./form.service');


router.get('/', asyncHandler(async function (req, res) {
    const forms = await formService.getForms();
    res.send(forms);
}));

router.get('/:formId/', asyncHandler(async function (req, res) {
    const formId = req.params['formId'];
    const form = await formService.getForm(formId);
    res.send(form);
}));


router.post('/', asyncHandler(async function (req, res) {
    const formData = req.body;
    let formModel = await formService.addForm(formData);
    res.send(formModel);
}));

router.get('/:formId/inputs', asyncHandler(async function (req, res) {
    const formId = req.params['formId'];
    const formInputs = await formService.getFormInputs(formId);
    res.send(formInputs);
}));

router.get('/:formId/records', asyncHandler(async function (req, res) {
    const formId = req.params['formId'];
    const formRecords = await formService.getFormRecords(formId);
    res.send(formRecords);
}));

router.post('/:formId/records/', asyncHandler(async function (req, res) {
    const formId = req.params['formId'];
    const record = req.body;
    const form = await formService.addRecordToForm(formId, record);
    res.send(form);
}));

router.get('/:formId/records/:recordId', asyncHandler(async function (req, res) {
    const formId = req.params['formId'];
    const recordId = req.params['recordId'];
    const record = await formService.getFormRecord(formId, recordId);
    res.send(record);
}));

router.put('/:formId/records/:recordId', asyncHandler(async function (req, res) {
    const formId = req.params['formId'];
    const recordId = req.params['recordId'];
    const recordData = req.body;
    const recordAfterUpdate = await formService.updateFormRecord(formId, recordId, recordData);
    res.send(recordAfterUpdate);
}));

router.delete('/:formId/records/:recordId', asyncHandler(async function (req, res) {
    const formId = req.params['formId'];
    const recordId = req.params['recordId'];
    const removedRecord = await formService.deleteRecord(formId, recordId);
    res.send(removedRecord);
}));

module.exports = router;