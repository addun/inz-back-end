const boom = require('boom');
const FormModel = require('./form.model');

async function getForms() {
    return await FormModel.find();
}

async function getForm(formId) {
    let form;
    try {
        form = await FormModel.findOne({folder: formId}).exec();
    } catch (e) {
        throw boom.badRequest(`Param ${formId} is incorrect`);
    }
    if (form) {
        return form;
    } else {
        throw boom.notFound(`Form with ID '${formId}' didn't found`);
    }
}

async function addForm(formData) {
    const formInstance = new FormModel(formData);
    try {
        return await formInstance.save();
    } catch (e) {
        throw boom.badRequest('Validation error', e);
    }
}

async function getFormInputs(formId) {
    const form = await getForm(formId);
    return form.inputs;
}

async function getFormRecords(formId) {
    const form = await getForm(formId);
    return form.records;
}

async function addRecordToForm(formId, recordData) {
    const recordModel = (new FormModel).records.create(recordData);
    try {
        const form = await getForm(formId);
        form.records.push(recordModel);
        await form.save();
        return recordModel;
    } catch (e) {
        throw boom.badRequest('Validation error', e);
    }
}

async function getFormRecord(formId, recordId) {
    const records = await getFormRecords(formId);
    const found = records.find(element => {
        return element._id.toString() === recordId;
    });
    if (found) {
        return found;
    } else {
        throw boom.notFound(`Record with id '${recordId}' in form '${formId}' not found`);
    }
}

async function updateFormRecord(formId, recordId, recordData) {
    await getFormRecord(formId, recordId);

    if (!recordData.values) {
        throw boom.badRequest('Invalid request');
    }

    await FormModel.findOneAndUpdate(
        {"records._id": recordId},
        {$set: {"records.$.values": recordData.values}},
    ).exec();

    return await getFormRecord(formId, recordId);
}

async function deleteRecord(formId, recordId) {
    const removedRecord = await getFormRecord(formId, recordId);
    await FormModel.update({},
        {$pull: {"records": {_id: recordId}}},
        {multi: true}
    ).exec();
    return removedRecord;
}

module.exports = {
    getForms: getForms,
    getForm: getForm,
    addForm: addForm,
    getFormInputs: getFormInputs,
    getFormRecords: getFormRecords,
    addRecordToForm: addRecordToForm,
    getFormRecord: getFormRecord,
    updateFormRecord: updateFormRecord,
    deleteRecord: deleteRecord
};