const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    publicKey: { type: String, required: true },
    generator: { type: String, required: true },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }

}, { timestamps: true });

const Key = mongoose.model('key', keySchema);
module.exports = Key;