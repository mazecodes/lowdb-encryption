const { validateOptions } = require('./lib/validator');
const crypto = require('./lib/crypto');

/**
 * Create serializer and deserializer
 *
 * @param {Object} [options] - The options object
 * @param {String} [options.secret] - The encryption secret
 * @param {Number} [options.iterations] - PBKDF2 iterations count
 * @returns {Object} - Serializer and deserializer
 *
 * @example
 *   lowdbEncryption({
 *     secret: 'secret',
 *     iterations: 50000
 *   })
 */
const lowdbEncryption = (options = {}) => {
  validateOptions(options);

  const { secret } = options;
  let iterations = options.iterations || 100000;

  let salt = crypto.generateSalt();
  let key;

  return {
    /**
     * Serialize and encrypt the state
     *
     * @param {Object} data - The lowdb state
     * @returns {String} - Encrypted and serialized state
     *
     * @example
     *   serialize({ foo: 'bar' })
     */
    serialize(data) {
      if (!key) {
        key = crypto.generateKey(secret, salt, iterations);
      }

      const { state, signature } = crypto.encryptState(
        JSON.stringify(data),
        key
      );

      const stateObject = {
        _encryption: {
          salt,
          iterations,
        },
        state: {
          content: state,
          signature,
        },
      };

      return JSON.stringify(stateObject);
    },
    /**
     * Decrypt and deserialize the state
     *
     * @param {String} data - Encrypted and serialized state
     * @returns {Object} - Decrypted and deserialized state
     *
     * @example
     *   deserialize('{ foo: "bar" }')
     */
    deserialize(data) {
      const json = JSON.parse(data);
      const { _encryption } = json;

      if (!_encryption) {
        return json;
      }

      const s = _encryption.salt;
      const iter = _encryption.iterations;

      salt = s || salt;
      iterations = typeof iter === 'number' ? iter : iterations;

      if (!key) {
        key = crypto.generateKey(secret, salt, iterations);
      }

      const stateContent = json.state.content;
      const stateSignature = json.state.signature;

      if (!stateContent || !stateSignature) {
        throw new Error('The state is not valid');
      }

      const isStateValid = crypto.isStateValid(
        stateContent,
        stateSignature,
        key
      );

      if (!isStateValid) {
        throw new Error('The state has been altered');
      }

      const decryptedState = crypto.decryptState(stateContent, key);

      return JSON.parse(decryptedState);
    },
  };
};

module.exports = lowdbEncryption;
