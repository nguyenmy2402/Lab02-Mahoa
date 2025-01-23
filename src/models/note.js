const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    idUser:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title:{type: String, required: true},
    content:{type: String, required: true}
}, {timestamps: true});

const Note = mongoose.model('note', noteSchema);
module.exports = Note;