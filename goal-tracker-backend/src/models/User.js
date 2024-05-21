const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('invalid email entered!!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(password) {
            if (password.toLowerCase().includes('password')) {
                throw new Error('password cannot include password in it!!')
            }
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;