const express = require('express');
const { createUser, handleLogin, shareKey, getKey } = require('../controllers/userControllers');
const { createNote, getNotes } = require('../controllers/noteController');
const {updateNote,deleteNote} = require('../controllers/noteController');
const auth = require('../middlewares/auth');

const {shareNote, getShares} = require('../controllers/shareController');

const routerAPI = express.Router();
routerAPI.all('*',auth);
routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);
routerAPI.get('/notes', getNotes);
routerAPI.post('/notes', createNote);
routerAPI.put('/notes', updateNote);
routerAPI.delete('/notes', deleteNote);
routerAPI.post('/share', shareNote);
routerAPI.get('/share', getShares);
routerAPI.post('/key', shareKey);
routerAPI.get('/key', getKey);
module.exports = routerAPI; //export default