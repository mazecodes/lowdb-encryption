const crypto = require('../src/lib/crypto');

const salt = crypto.generateSalt();
const key = crypto.generateKey('secret', salt);
const { state, signature } = crypto.encryptState('{ foo: "bar" }', key);
const isStateValid = crypto.isStateValid(state, signature, key);
const decryptedState = crypto.decryptState(state, key);

console.log('Salt', salt);
console.log('Key', key);
console.log('Encrypted state', state);
console.log('Signature', signature);
console.log('Is state valid', isStateValid);
console.log('Decrypted state', decryptedState);
