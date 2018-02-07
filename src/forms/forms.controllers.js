const PatternModel = require('./forms.models');

module.exports = {
    getAll: function (req, res) {
        PatternModel.find({})
            .then(models => {
                res.send(models);
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
        PatternModel.findByIdAndUpdate(
            formId,
            {$push: {data: data}},
            {
                returnNewDocument: true
            }
        ).then((before) => {
            res.send(before);
        });
    },


};