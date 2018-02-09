const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tree = require('mongoose-path-tree');


const FolderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isCollapse: {
        type: Boolean,
        default: false
    }
});

FolderSchema.plugin(tree);

module.exports = mongoose.model('Folder', FolderSchema);