const FoldersModel = require('./folders.models');

module.exports = {
    getAll: function (req, res) {
        FoldersModel.find({})
            .then(models => {
                res.send(models);
            });
    },
    getChildrenTree: function (req, res) {
        const folderId = req.params['folderId'];

        FoldersModel
            .findById(folderId)
            .then(model => {
                model.getChildrenTree((err, tree) => {
                    res.send(tree);
                });
            })

    },
    addNew: function (req, res) {
        const folder = new FoldersModel(req.body);
        folder
            .save()
            .then(savedModel => {
                res.send(savedModel);
            })
            .catch(error => {
                res.send(error);
            });
    },
    removeChild: function (req, res) {
        const folderId = req.params['folderId'];
        FoldersModel
            .findById(folderId)
            // .remove()
            .then(model => {
                res.send(model);
            })
    }
};