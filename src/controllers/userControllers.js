const { createUserService,loginUserService } = require('../services/userServices');
const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error('Invalid input');
        }
        const data = await createUserService(username, password);
        return res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const handleLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = await loginUserService(username, password);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createUser,
    handleLogin
};