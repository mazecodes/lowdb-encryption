const crypto = require('../src/lib/crypto');

const salt = crypto.generateSalt();
const key = crypto.generateKey('secret', salt);

console.log(salt);
console.log(key);
