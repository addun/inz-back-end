const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Form', new Schema({
    name: {
        type: String,
        required: true
    },
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'Folders'
    },
    inputs: [{
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
    }],
    records: [{
        values: {
            type: Schema.Types.Mixed,
            required: true
        }
    }],
    predefined: {
        type: Boolean,
        default: false
    }
}));