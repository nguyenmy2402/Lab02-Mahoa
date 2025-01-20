const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    id_user: String,
    title: String,
    content: String,
});

const Note = mongoose.model('note', noteSchema);
module.exports = Note;