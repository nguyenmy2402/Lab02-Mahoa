const Share = require('../models/share');

const createShareService = async (idNote, publicKey,title,content) => {
    try{
        const share = await Share.create({
            idNote: idNote,
            publicKey: publicKey,
            title: title,
            content:content
        });
        console.log(data);
        return data;
    }catch(error)
    {
        throw new Error(error.message);
    }
}

const getSharesService = async (id) => {
    try{
        console.log(id);    
        const shares = await Share.findOne({_id:id});
        return shares;
    }catch(error)
    {
        throw new Error(error.message); 
    }
}

const deleteShareService = async (idNote) => {
    try {
        const share = await Share.deleteOne({ idNote:idNote }); // Sửa lỗi
        return share;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateShareService = async (idNote, title, content) => {
    try{
        const share = await Share.findOneAndUpdate({ idNote: idNote }, { title: title, content: content }, { new: true });  
        return share
    }catch(error)
    {
        throw new Error(error.message); 
    }
};
const findShareService = async (idNote) => {
    try {
        const share = await Share.findOne({ idNote: idNote });
        return share;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    createShareService,
    getSharesService,
    deleteShareService,
    updateShareService,
    findShareService
};