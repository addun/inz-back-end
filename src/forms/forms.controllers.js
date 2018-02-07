const PatternModel = require('./forms.models');

module.exports = {
    getAll: function (req, res) {
        PatternModel.find({})
            .then(models => {
                res.send(models);
            });
    },
    getInputs: function (req, res) {
        const formId = req.params['formId'];
        PatternModel
            .findById(formId)
            .then(foundForm => {
                res.send(foundForm.inputs);
            });
    },

    addNew: function (req, res) {
        const p = new PatternModel(req.body);
        p.save()
            .then(savedModel => {
                res.send(savedModel);
            });
    },

    addData: function (req, res) {
        const formId = req.params['formId'];
        const data = req.body;
        PatternModel
            .findByIdAndUpdate(formId, {$push: {data: data}},
            ).then((before) => {
            res.send(before);
        });
    }
};