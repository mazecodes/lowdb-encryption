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
  CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);

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
  }).toString(CryptoJS.enc.Hex);

module.exports = {
  generateSalt,
  generateKey,
};