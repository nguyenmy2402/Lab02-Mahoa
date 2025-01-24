const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Mảng chứa danh sách người dùng được chia sẻ
}, { timestamps: true });

const Note = mongoose.model('note', noteSchema);  // Giữ nguyên tên model là 'note'
module.exports = Note;

