const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tree = require('mongoose-path-tree');

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

FolderSchema.plugin(tree);

const FolderModel = mongoose.model('Folder', FolderSchema);

module.exports = FolderModel;
