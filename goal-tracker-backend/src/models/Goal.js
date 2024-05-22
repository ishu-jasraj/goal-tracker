const { ObjectId, Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const taskSchema = require('./Task');

const goalSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [taskSchema]
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
        required: true,
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