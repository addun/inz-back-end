const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Form', new Schema({
    name: String,
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'Folders'
    },
    inputs: [{
        name: String,
        label: String,
        type: {
            type: String
        },
    }],
    records: [{
        __alwaysEmpty: String,
        values: {}
    }]
}));