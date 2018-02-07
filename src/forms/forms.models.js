const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    name: String,
    inputs: [{
        name: String,
        label: String,
        type: {
            type: String
        },
    }],
    data: [{
        __alwaysEmpty: String,
        values: {}
    }]
});


module.exports = mongoose.model('Form', FormSchema);