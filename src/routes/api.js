const express = require('express');
const { createUser, handleLogin } = require('../controllers/userControllers');
const { getUsers } = require('../controllers/userControllers'); // Import controller mới để lấy danh sách người dùng
const { createNote, getNotes } = require('../controllers/noteController');
const {updateNote,deleteNote,shareNote} = require('../controllers/noteController');
const auth = require('../middlewares/auth');


const routerAPI = express.Router();
routerAPI.all('*',auth);
routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);
routerAPI.get('/users', auth, getUsers);  // Auth để đảm bảo chỉ những người dùng hợp lệ mới có thể truy cập
routerAPI.get('/notes', getNotes);
routerAPI.post('/notes', createNote);
routerAPI.put('/notes', updateNote);
routerAPI.delete('/notes', deleteNote);
// Route chia sẻ note
routerAPI.post('/notes/share', shareNote);

module.exports = routerAPI; //export default