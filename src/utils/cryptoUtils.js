const crypto = require('crypto');

const SECRET_KEY = crypto.randomBytes(32).toString('hex');

function encryptAES(text, key) {
    const iv = crypto.randomBytes(16); // Vector khởi tạo
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex') };
}


function decryptAES(encryptedData, iv, key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

module.exports = { encryptAES, decryptAES, SECRET_KEY };