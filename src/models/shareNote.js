const mongoose = require('mongoose');

const sharedNoteSchema = new mongoose.Schema({
    idNote: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true }, // Tham chiếu đến Note
    sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người chia sẻ
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Người nhận
    sharedAt: { type: Date, default: Date.now }, // Thời gian chia sẻ
}, { timestamps: true });

const SharedNote = mongoose.model('SharedNote', sharedNoteSchema);

module.exports = SharedNote;
