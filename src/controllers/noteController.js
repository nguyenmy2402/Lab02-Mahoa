const { create } = require('../models/note');
const {createNoteService, getNotesService} = require('../services/noteServices');
const {shareNoteService, updateNoteService, deleteNoteService} = require('../services/noteServices');


const createNote = async (req, res) => {
    try {
        const {idUser, title, content } = req.body;
        const data = await createNoteService(idUser, title, content);
        return res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Route tạo ghi chú mới

// const getNotes = async (req, res) => {
//     try {
//         const {idUser} = req.body;
//         const data = await getNotesService(idUser);
//         return res.status(200).json(data);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// const getNotes = async (req, res) => {
//     try {
//         const { idUser } = req.query; // Lấy idUser từ query parameters
//         if (!idUser) {
//             return res.status(400).json({ error: 'User ID is required' });
//         }
//         const data = await getNotesService(idUser);
//         return res.status(200).json(data);
//     } catch (error) {
//         console.error('Error fetching notes:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const getNotes = async (req, res) => {
    try {
        const { idUser } = req.query;
        if (!idUser) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const notes = await getNotesService(idUser); // Gọi service lấy danh sách ghi chú
        return res.status(200).json(notes);  // Trả về mảng các ghi chú
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// const deleteNote = async (req, res) => {

//     try {
//         const id = req.body.id;
//         const data = await deleteNoteService(id);
//         return res.status(200).json(data);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const deleteNote = async (req, res) => {
    console.log("Received request body:", req.body);  // In ra body nhận được
    try {
        const { id } = req.body;
        const note = await deleteNoteService(id);

        return res.status(200).json({ message: 'Note deleted successfully', note });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const {id, title, content } = req.body;

        const data = await updateNoteService(id, title, content);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const shareNote = async (req, res) => {
    try {
        const { noteId, userIds } = req.body;  // Lấy noteId và danh sách userIds từ body

        // Gọi service chia sẻ note
        const note = await shareNoteService(noteId, userIds);

        return res.status(200).json({
            message: 'Note shared successfully',
            note: note
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getNotes,
    createNote,
    deleteNote,
    updateNote,
    shareNote
};