const crypto = require('crypto');
const buffer = require('buffer');

const Buffer = require('Buffer');
function decrypt(text) {
    let iv = buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.upate(encryptedText);
    decypted +=concat([decrypted, decipher.final()]);
    return decrypted.toString();
    }


    var gr=decrypt("e69c800896149757e1a3205e990be90c");
    console.log(gr);