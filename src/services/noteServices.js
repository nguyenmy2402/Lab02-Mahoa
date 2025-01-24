const jwt = require('jsonwebtoken');
const noteModel = require('../models/note');
const mongoose = require('mongoose');  // Đảm bảo đã import mongoose

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

// const getNotesService = async (idUser) => {
//     try{
//         const notes = await noteModel.find({idUser:idUser});
//         return notes;
//     }catch(error)
//     {
//         throw new Error(error.message); 
//     }
// }

// const getNotesService = async (idUser) => {
//     try {
//         const notes = await noteModel.find({ idUser });
//         return notes;
//     } catch (error) {
//         console.error('Database error:', error);
//         throw new Error('Error retrieving notes');
//     }
// }

// const getNotesService = async (idUser) => {
//     try {
//         const notes = await noteModel.find({ idUser });  // Lấy tất cả các ghi chú của người dùng
//         return notes;  // Trả về mảng các ghi chú
//     } catch (error) {
//         console.error('Database error:', error);
//         throw new Error('Error retrieving notes');
//     }
// };

const getNotesService = async (userId) => {
    try {
        // Lấy tất cả các ghi chú của người dùng (bao gồm cả các ghi chú đã được chia sẻ với người dùng)
        const notes = await noteModel.find({
            $or: [
                { idUser: userId },  // Các ghi chú của người dùng
                { sharedWith: userId }  // Các ghi chú được chia sẻ với người dùng
            ]
        });
        return notes;
    } catch (error) {
        throw new Error(error.message);
    }
};
// const deleteNoteService = async (id) => {
//     console.log("Deleting note with ID:", id);
//     try {
//         const note = await noteModel.deleteOne({ _id: id }); // Sửa lỗi
//         return note;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// Backend: Xóa ghi chú
const deleteNoteService = async (id) => {
    console.log("Deleting note with ID:", id);

    try {
        // Kiểm tra ID hợp lệ trước khi thực hiện xóa
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        // Thực hiện xóa ghi chú khỏi database
        const note = await noteModel.findByIdAndDelete(id);  // Dùng findByIdAndDelete để xóa theo _id

        if (!note) {
            throw new Error("Note not found");
        }

        // Trả về ghi chú đã xóa (hoặc thông tin cần thiết)
        return note; 
    } catch (error) {
        console.error("Error during deletion:", error); // Log chi tiết lỗi
        throw new Error(error.message); // Trả về lỗi nếu có
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

const shareNoteService = async (noteId, userIds) => {
    try {
        const note = await noteModel.findById(noteId);
        if (!note) {
            throw new Error('Note not found');
        }

        // Cập nhật trường sharedWith với các userIds mới
        note.sharedWith.push(...userIds);
        await note.save();  // Lưu thay đổi vào cơ sở dữ liệu

        return note;  // Trả về note đã được chia sẻ
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createNoteService,
    getNotesService,
    deleteNoteService,
    updateNoteService,
    shareNoteService
};