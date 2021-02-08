const CryptoJS = require('crypto-js');

/**
 * Generate a random salt
 *
 * @param {Number} [length] - The length of the salt in bytes (optional)
 * @returns {String} - A randomly generated salt
 *
 * @example
 *   generateSalt()
 *   generateSalt(10)
 */
const generateSalt = (length = 16) =>
  CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Base64);

/**
 * Generate a key from a secret
 *
 * @param {String} secret - The secret to generate a key from
 * @param {String} salt - The salt
 * @param {Number} [iterations] - PBKDF2 iterations count (optional)
 * @returns {String} - 256-bit key
 *
 * @example
 *   generateKey('secret', 'salt')
 *   generateKey('secret', 'salt', 50000)
 */
const generateKey = (secret, salt, iterations = 100000) =>
  CryptoJS.PBKDF2(secret, salt, {
    keySize: 256 / 32,
    iterations,
  }).toString(CryptoJS.enc.Base64);

/**
 * Encrypt the given state
 *
 * @param {String} state - The state to encrypt
 * @param {String} key - The key to be used for encryption
 * @returns {Object} - Encrypted state and signature
 *
 * @example
 *   encryptState('{ foo: "bar" }', 'key')
 */
const encryptState = (state, key) => {
  const encryptedState = CryptoJS.AES.encrypt(state, key, {
    mode: CryptoJS.mode.CBC,
  }).toString();
  const signature = CryptoJS.HmacSHA256(encryptedState, key).toString(
    CryptoJS.enc.Base64
  );

  return {
    state: encryptedState,
    signature,
  };
};

/**
 * Decrypt the given state
 *
 * @param {String} encryptedState - The encrypted state
 * @param {String} key - The key used for encryption
 * @returns {String} - The decrypted state
 *
 * @example
 *   decryptState(encryptedState, 'key')
 */
const decryptState = (encryptedState, key) => {
  const decryptedState = CryptoJS.AES.decrypt(encryptedState, key, {
    mode: CryptoJS.mode.CBC,
  }).toString(CryptoJS.enc.Utf8);

  return decryptedState;
};

/**
 * Check if a state/signature is valid
 *
 * @param {String} encryptedState - The ecnrypted state
 * @param {String} signature - The given signatire
 * @param {String} key - The key used for encryption and signing
 * @returns {Boolean} - True if the state was valid
 *
 * @example
 *   isStateValid(encryptedState, signature, 'key')
 */
const isStateValid = (encryptedState, signature, key) => {
  const sig = CryptoJS.HmacSHA256(encryptedState, key).toString(
    CryptoJS.enc.Base64
  );

  return sig === signature;
};

module.exports = {
  generateSalt,
  generateKey,
  encryptState,
  decryptState,
  isStateValid,
};
