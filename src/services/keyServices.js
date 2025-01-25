const keyModel = require('../models/key');

const createKeyService = async (publicKey, generator, idUser) => {
    try {
        const key = await keyModel.create({
            publicKey: publicKey,
            generator: generator,
            idUser: idUser
        });
        return key;
    } catch (error) {
        throw new Error(error.message);
    }
}
const getKeyByUserService = async (idUser) => {
    try {
        const key = await keyModel.findOne({ idUser: idUser });
        return key;
    }
    catch (error) {
        throw new Error(error.message);
    }
}
const getKeyService = async (id) => {
    try {
        const keys = await keyModel.findOne({ _id: id });
        return keys;
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = { 
    createKeyService,
    getKeyService,
    getKeyByUserService
};