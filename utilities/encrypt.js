const crypto = require('crypto');

module.exports.generateSalt = () => crypto.randomBytes(16).toString('base64');

module.exports.hashPassword = (password, salt) => crypto.pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    'sha512'
).toString('base64');
