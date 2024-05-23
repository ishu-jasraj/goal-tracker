const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    payload: {
        type: String
    },
    created_ts: {
        type: Date,
        default: Date.now
    },
    op_type: {
        type: String
    }
});

const Log = mongoose.model('Log', logSchema)

module.exports = Log;