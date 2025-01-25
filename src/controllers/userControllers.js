const crypto = require('crypto');
const {
    createUserService,
    loginUserService,
} = require('../services/userServices');
const { getKeyByUserService, getKeyService,createKeyService } = require('../services/keyServices');
const createUser = async (req, res) => {
    try {
        const { name, password, privateKeyOfAES } = req.body;
        if (!name || !password) {
            throw new Error('Invalid input');
        }
        const dh = crypto.createDiffieHellman(1024);
        dh.generateKeys();
        const diffieHellman = {
            privateKey: dh.getPrivateKey('hex'),
            publicKey: dh.getPublicKey('hex'),
            generator: dh.getGenerator('hex')
        };
        console.log(diffieHellman);
        const data = await createUserService(name, password, privateKeyOfAES,diffieHellman.privateKey );
        await createKeyService( diffieHellman.publicKey,diffieHellman.generator,data._id);

        return res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// const handleLogin = async (req, res) => {
//     try {
//         const { name, password } = req.body;
//         const data = await loginUserService(name, password);
//         return res.status(200).json(data);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const handleLogin = async (req, res) => {
    try {
        console.log('Login Request Data:', req.body); // Xác minh dữ liệu nhận được
        const { name, password } = req.body;

        const data = await loginUserService(name, password);
        console.log('Login Service Response:', data); // Log phản hồi từ service

        res.status(200).json({
            EC: 0,
            EM: 'Login successful',
            data,
        });
    } catch (error) {
        console.error('Handle Login Error:', error.message); // Log lỗi chi tiết
        res.status(400).json({
            EC: -1,
            EM: error.message,
        });
    }
};

const shareKey = async (req, res) => {
    try {
        const { idUser } = req.body;
        const data = await getKeyByUserService(idUser);
        return res.status(201).json({url:'http://localhost:5173/share/'+data._id});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getKey = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await getKeyService(id);
        return res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    createUser,
    handleLogin,
    shareKey,
    getKey
};
