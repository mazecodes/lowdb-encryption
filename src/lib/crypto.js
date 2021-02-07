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

module.exports = {
  generateSalt,
};
