const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tree = require('mongoose-path-tree');
const Forms = require('./../forms/form.schema');

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isCollapse: {
        type: Boolean,
        default: true
    }
});

FolderSchema.plugin(tree);

const FolderModel = mongoose.model('Folder', FolderSchema);

// Remove forms without folders
// FolderSchema.post('remove', function (next) {
//     Forms.find({})
//         .then(models => {
//             models.forEach(model => {
//                 const folderId = model.folder;
//                 FolderModel
//                     .findById(folderId)
//                     .then(folder => {
//                         if (folder === null) model.remove();
//                     })
//             });
//         })
//         .catch(err => console.log(err));
//     next();
// });

module.exports = FolderModel;
