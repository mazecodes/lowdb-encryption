const crypto = require('../src/lib/crypto');

const salt = crypto.generateSalt();
const key = crypto.generateKey('secret', salt);
const { state, signature } = crypto.encryptState('{ foo: "bar" }', key);

console.log(salt);
console.log(key);
console.log(state);
console.log(signature);
