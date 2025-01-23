const express = require('express');
const { createUser, handleLogin } = require('../controllers/userControllers');
const { createNote, getNotes } = require('../controllers/noteController');
const {updateNote,deleteNote} = require('../controllers/noteController');
const auth = require('../middlewares/auth');


const routerAPI = express.Router();
routerAPI.all('*',auth);
routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);
routerAPI.get('/notes', getNotes);
routerAPI.post('/notes', createNote);
routerAPI.put('/notes', updateNote);
routerAPI.delete('/notes', deleteNote);

module.exports = routerAPI; //export default