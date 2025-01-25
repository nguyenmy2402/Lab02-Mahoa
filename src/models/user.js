const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String, required: true},
    AES:{
        privateKey: { type: String, required: true }, // Private Key được mã hóa
    },
    DiffieHellman:{
        privateKey: { type: String, required: true }, // Private Key được mã hóa
    }
},{timestamps:true});

const User = mongoose.model('user', userSchema);
module.exports = User;
