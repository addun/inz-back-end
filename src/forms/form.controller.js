const FormModel = require('./form.schema');
const mongoose = require('mongoose');

module.exports = {
    getAllForm: (req, res) => {
        const query = req.query ? req.query : {};
        FormModel
            .find(query)
            .then(found => {
                res.send(found ? found : []);
            })
            .catch(error => {
                res.send(error);
            });
    },
    getForm: function (req, res) {
        const formId = req.params['formId'];
        FormModel
            .findById(formId)
            .then(found => {
                res.send(found);
            })
            .catch(error => {
                res.send(error);
            });
    },
    getFormInputs: function (req, res) {
        const formId = req.params['formId'];
        FormModel
            .findById(formId)
            .then(foundForm => {
                res.send(foundForm.inputs);
            })
            .catch(error => {
                res.send(error);
            });
    },
    getFormRecords: function (req, res) {
        const formId = req.params['formId'];
        FormModel
            .findById(formId)
            .then(foundForm => {
                res.send(foundForm ? foundForm : []);
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            });
    },
    getRecord: function (req, res) {
        const recordId = req.params['recordId'];
        FormModel
            .findOne(
                {"records._id": recordId},
                {_id: 0, records: {$elemMatch: {_id: recordId}}}
            )
            .then(found => {
                res.send(found.records[0]);
            })
    },
    addNewForm: function (req, res) {
        const form = new FormModel(req.body);
        form
            .save()
            .then(savedModel => {
                res.send(savedModel);
            })
            .catch(error => {
                res.send(error);
            });
    },
    addFormRecord: function (req, res) {
        const formId = req.params['formId'];
        const data = req.body;
        data._id = mongoose.Types.ObjectId();
        FormModel
            .findByIdAndUpdate(formId, {$push: {records: data}})
            .then((before) => {
                res.send(data);
            })
            .catch(error => {
                res.send(error);
            });
    },

    removeRecord: function (req, res) {
        const recordId = req.params['recordId'];
        console.log(recordId);
        FormModel
            .update({},
                {$pull: {"records": {_id: recordId}}},
                {multi: true}
            )
            .then(removedModel => {
                res.send(removedModel);
            });
    },
    updateRecord: function (req, res) {
        const recordId = req.params['recordId'];
        FormModel
            .update(
                {"records._id": recordId},
                {$set: {"records.$": req.body}}
            )
            .then(found => {
                res.send({});
            })
    }
};