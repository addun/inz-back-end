const FoldersModel = require('./folders.model');

module.exports = {
    getForms: function (req, res) {
        FoldersModel
            .getChildrenTree(null, {}, function (err, tree) {
                res.send(tree);
            });
    },

    addFolder: function (req, res) {
        const folder = new FoldersModel(req.body);
        folder
            .save()
            .then(savedModel => res.send(savedModel));
    },

    removeFolder: function (req, res) {
        const folderId = req.params['folderId'];
        FoldersModel
            .findById(folderId)
            .then(model => {
                model.remove();
                res.send(model);
            })
    },

    updateFolder: function (req, res) {
        const folderId = req.params['folderId'];
        FoldersModel
            .findByIdAndUpdate(folderId,
                {$set: req.body},
                {new: true})
            .then(model => res.send(model));
    }
};