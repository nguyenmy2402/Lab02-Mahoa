const { findNoteService, updateIsSharedService } = require("../services/noteServices");
const { findShareService, updateShareService,createShareService,getSharesService,deleteShareService } = require("../services/shareServices");


const shareNote = async (req, res) => {
    const { idNote, publicKey, title, content } = req.body;
    try{
        const existShare = await findShareService(idNote);
        console.log(existShare);
        if(existShare)
        {
            const note = await findNoteService(existShare.idNote);
            console.log(note);
            if(note.isShared)
            {
                if(existShare.createdAt > Date.now() - 24*60*60*1000)
                {
                    return res.status(200).json('Note is shared');
                }
            }
            const share = await updateShareService(idNote, title, content);
            await updateIsSharedService(idNote, true);
            return res.status(200).json({url:'http://localhost:5173/share/'+share._id}); 
        }
        const data = await createShareService(idNote, publicKey, title, content);
        await updateIsSharedService(idNote, true);
        return res.status(201).json({url:'http://localhost:5173/share/'+share._id});
    }
    catch(error)
    {
        res.status(400).json({ error: error.message });
    }
};
const getShares = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await getSharesService(id);
        const note = await findNoteService(data.idNote);
        console.log(note);
        if(!note.isShared)
        {
            return res.status(200).json('Note is not shared');
        }
        else if(data.createdAt < Date.now() - 24*60*60*1000)
        {
            await updateIsSharedService(data.idNote, false);
            return res.status(200).json('Share is expired');
        }
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const deleteShare = async (req, res) => {
    try {
        const idNote = req.body.idNote;
        const data = await deleteShareService(idNote);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    shareNote,
    getShares,
    deleteShare
};