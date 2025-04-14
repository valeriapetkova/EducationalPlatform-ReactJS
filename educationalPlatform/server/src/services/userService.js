const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

exports.register = async (userData) => {
    const user = await User.findOne({email: userData.email});

    if (user) {
        throw new Error('This email already exists');
    }

    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser);
    
    return { user: {_id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role, username: user.username, email: user.email}, token};
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    const token = await generateToken(user);
    
    return { user: {_id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role, username: user.username, email: user.email}, token};
};

async function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '1d' });

    return token;
};

exports.getUserInfo = async (userId, token) => {
    const userData = await User.findById(userId);
    return { user: {_id: userData._id, firstName: userData.firstName, lastName: userData.lastName, role: userData.role, username: userData.username, email: userData.email}, token};
    // return { firstName: userData.firstName, lastName: userData.lastName, role: userData.role, username: userData.username, email: userData.email};
}

exports.getUserEditInfo = async (userId) => {
    const userData = await User.findById(userId);
    // return { user: {_id: userData._id, firstName: userData.firstName, lastName: userData.lastName, role: userData.role, username: userData.username, email: userData.email}, token};
    return { firstName: userData.firstName, lastName: userData.lastName, role: userData.role, username: userData.username, email: userData.email};
}

exports.updateUserInfo = async (userId, userData) => {
    const user = await User.findOne({email: userData.email});
    // console.log(user);

    if (user && user._id.toString() !== userId) {
        throw new Error('This email already exists');
    }

    return await User.findByIdAndUpdate(userId, userData);
}