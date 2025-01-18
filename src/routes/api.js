const express = require('express');
const { createUser, handleLogin } = require('../controllers/userControllers');

const routerAPI = express.Router();

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')


// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);
module.exports = routerAPI; //export default