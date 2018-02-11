const FormModel = require('./form.schema');

module.exports = {
    getAllForm: (req, res) => {
        const query = req.query ? req.query : {};
        FormModel
            .find(query)
            .then(found => {
                res.send(found);
            });
    },
    getForm: (req, res) => {
        const formId = req.params['formId'];
        FormModel
            .findById(formId)
            .then(found => {
                res.send(found);
            });
    },
    getFormInputs: function (req, res) {
        const formId = req.params['formId'];
        FormModel
            .findById(formId)
            .then(foundForm => {
                res.send(foundForm.inputs);
            });
    },
    getFormRecords: function (req, res) {
        const formId = req.params['formId'];
        FormModel
            .findById(formId)
            .then(foundForm => {
                res.send(foundForm.records);
            });
    },

    addNewForm: function (req, res) {
        const form = new FormModel(req.body);
        form
            .save()
            .then(savedModel => {
                res.send(savedModel);
            });
    },
    addFormRecord: function (req, res) {
        const formId = req.params['formId'];
        const data = req.body;
        FormModel
            .findByIdAndUpdate(formId, {$push: {data: data}})
            .then((before) => {
                res.send(before.data);
            });
    }
};