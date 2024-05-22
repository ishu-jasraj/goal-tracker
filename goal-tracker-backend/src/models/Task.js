const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },
    frequency: {
        type: String
    },
    reminder: {
        type: Boolean,
        default: false
    },
    time: {
        type: String,
        default: null
    }

});

module.exports = taskSchema;