const { create } = require('../models/note');
const {createNoteService, getNotesService} = require('../services/noteServices');
const {updateNoteService, deleteNoteService} = require('../services/noteServices');
const createNote = async (req, res) => {
    try {
        const {idUser, title, content } = req.body;
        const data = await createNoteService(idUser, title, content);
        return res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const {idUser} = req.query;
        const data = await getNotesService(idUser);
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