const FormModel = require('./forms.models');

module.exports = {
    getAll: function (req, res) {
        FormModel.find({})
            .then(models => {
                res.send(models);
            });
    },
    getInputs: function (req, res) {
        const formId = req.params['formId'];
        FormModel
            .findById(formId)
            .then(foundForm => {
                res.send(foundForm.inputs);
            });
    },

    addNew: function (req, res) {
        const form = new FormModel(req.body);
        form
            .save()
            .then(savedModel => {
                res.send(savedModel);
            });
    },

    addData: function (req, res) {
        const formId = req.params['formId'];
        const data = req.body;
        FormModel
            .findByIdAndUpdate(formId, {$push: {data: data}})
            .then((before) => {
                res.send(before.data);
            });
    }
};