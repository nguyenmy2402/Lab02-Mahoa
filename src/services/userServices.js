const User = require("../models/user");
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const createUserService = async (name,password) => {
    const existsUser = await User.findOne({ name: name });
    if (existsUser) {
        throw new Error('User already exists');
    }
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            name:name,
            password:hash,
            role:"user"
        });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}
const loginUserService = async (name,password) => {
    try {
        const user = await User.findOne({ name: name });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const payload = { name: user.name };
        const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: process.env.EXPIRE_TIME });

        return { token: token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
        }};
    }
    catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    createUserService,
    loginUserService
}   


