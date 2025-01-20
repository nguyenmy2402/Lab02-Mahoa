const {createNoteService, getNotesService} = require('../services/noteServices');
const {updateNoteService, deleteNoteService} = require('../services/noteServices');
const createNote = async (req, res) => {
    try {
        const {id_user, title, content } = req.body;
        const data = await createNoteService(id_user, title, content);
        return res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const {id_user} = req.body;
        const data = await getNotesService(id_user);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteNote = async (req, res) => {

    try {
        const id = req.body.id;
        const data = await deleteNoteService(id);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

module.exports = {
    getNotes,
    createNote,
    deleteNote,
    updateNote
};