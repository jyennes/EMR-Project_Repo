const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = 'bncaskdbvasbvlaslslasfhj'
const ENCRYPTION_KEY = crypto.scryptSync(password, 'GfG', 24); 
// const iv = Buffer.alloc(16, 0);
const IV_LENGTH = 16;


function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// var hello = encrypt('hello')
// console.log(decrypt(hello));

module.exports = { encrypt, decrypt };
