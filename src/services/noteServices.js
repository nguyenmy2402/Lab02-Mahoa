const jwt = require('jsonwebtoken');
const noteModel = require('../models/note');

const createNoteService = async (idUser,title, content) => {
    try{
        const existsNote = await noteModel.findOne({ title: title });
        console.log(idUser);
        if (existsNote) {
            throw new Error('Note already exists');
        }
        const note = await noteModel.create({
            idUser: idUser,
            title: title,
            content: content
        });
        return note;
    }catch(error)
    {
        throw new Error(error.message);
    }
}
const getNotesService = async (idUser) => {
    try{
        const notes = await noteModel.find({idUser:idUser});
        return notes;
    }catch(error)
    {
        throw new Error(error.message); 
    }
}

const deleteNoteService = async (id) => {
    console.log("Deleting note with ID:", id);
    try {
        const note = await noteModel.deleteOne({ _id: id }); // Sửa lỗi
        return note;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateNoteService = async (id, title, content) => {
    try{
        const note = await noteModel.findOneAndUpdate({ _id: id }, { title: title, content: content }, { new: true });  
        return note
    }catch(error)
    {
        throw new Error(error.message); 
    }
};
module.exports = {
    createNoteService,
    getNotesService,
    deleteNoteService,
    updateNoteService
};