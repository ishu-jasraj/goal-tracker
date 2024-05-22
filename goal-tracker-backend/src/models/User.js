const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function (next) {
    const user = this;
    try {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }
        next();
    }
    catch (e) {
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;