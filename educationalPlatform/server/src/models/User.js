const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
    },
});

userSchema.virtual('repeatPassword').set(function(value) {
    if (value !== this.password) {
        throw new Error('Password missmatch!');
    }
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;