const { ObjectId, Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: Array
    },
    minTime: {
        type: Date,
        required: true,
    },
    maxTime: {
        type: Date,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

goalSchema.pre('save', function (next) {
    if (this.isModified('minTime')) {
        this.minTime = this.minTime.toISOString().split('T')[0];
    }
    if (this.isModified('maxTime')) {
        this.maxTime = this.maxTime.toISOString().split('T')[0];
    }
    next();
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;