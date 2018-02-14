const FoldersModel = require('./folders.models');

module.exports = {
    getAllForm: function (req, res) {
        FoldersModel
            .getChildrenTree(null, {}, function (err, tree) {
                res.send(tree);
            });
    },
    addNewForm: function (req, res) {
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
        console.log(folderId);
        FoldersModel
            .findByIdAndRemove(folderId)
            .then(model => {
                res.send(model);
            })
            .catch(error => {
                res.send(error);
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
            .catch(error => {
                res.send(error);
            });
    }
};