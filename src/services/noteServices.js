const jwt = require('jsonwebtoken');
const noteModel = require('../models/note');

const createNoteService = async (id_user,title, content) => {
    console.log(id_user);
    try{
        const note = await noteModel.create({
            id_user: id_user,
            title: title,
            content: content
        });
        return note;
    }catch(error)
    {
        throw new Error(error.message);
    }
}
const getNotesService = async (id) => {
    console.log(id);
    try{
        const note = await noteModel.find({id_user:id});
        return note
    }catch(error)
    {
        throw new Error(error.message); 
    }
}

const deleteNoteService = async (id) => {
    try{
        const note = await noteModel.deleteOne({id:id});
        return note
    }catch(error)
    {
        throw new Error(error.message); 
    }
};

const updateNoteService = async (id, title, content) => {
    try{
        const note = await noteModel.updateOne({id:id
        }, {
            title: title,
            content: content
        });
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