const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
    idNote:{type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true},
    publicKey:{type: String, required: true},
    title:{type: String, required: true},
    content:{type: String, required: true},
}, {timestamps: true});
const Share = mongoose.model('share', shareSchema);
module.exports = Share;