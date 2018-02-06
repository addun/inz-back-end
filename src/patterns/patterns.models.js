const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatternSchema = new Schema({
    name: String,
    inputs: [{
        name: String,
        label: String
    }],
});


const PatterModel = mongoose.model('Pattern', PatternSchema);

module.exports = PatterModel;