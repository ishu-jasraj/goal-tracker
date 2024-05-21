const { ObjectId, Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: {
        type: Array
    },
    minTime: {
        type: Date
    },
    maxTime: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;