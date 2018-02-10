const FoldersModel = require('./folders.models');

module.exports = {
    getAll: function (req, res) {
        FoldersModel
            .getChildrenTree(null, {}, function (err, tree) {
                res.send(tree);
            });
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
    remove: function (req, res) {
        const folderId = req.params['folderId'];
        FoldersModel
            .findById(folderId)
            .remove()
            .then(model => {
                res.send(model);
            })
    },
    update: function (req, res) {
        const folderId = req.params['folderId'];
        FoldersModel
            .findByIdAndUpdate(folderId,
                {$set: req.body},
                {new: true})
            .then(model => {
                res.send(model);
            })
    }
};