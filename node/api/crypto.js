// crypto c/c++实现后暴露的算法
// md5
const crypto = require('crypto');
const hash = crypto.createHash('md5'); // sha1
hash.update('your-key');
console.log(hash.digest('hex')); // 十六进制输出md5的hash值

// Hmac
const hmac = crypto.createHmac('sha256', 'secret-key'); // 多了私钥
hmac.update('Hello, world!');
console.log(hmac.digest('hex'));

// AES对称加密，加解密为同一密匙，需要个人封装加密函数
// aes192, aes-128-ecb, aes-256-cbc
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);
console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted); // 加密后
console.log('Decrypted text: ' + decrypted); // 还原

// Diffie-Hellman
// https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501504929883d11d84a1541c6907eefd792c0da51000