const { validateOptions } = require('./lib/validator');
const crypto = require('./lib/crypto');

const lowdbEncryption = (options = {}) => {
  validateOptions(options);

  const { secret } = options;
  const iterations = options.iterations || 100000;

  const salt = crypto.generateSalt();
  let key;

  return {
    /**
     * Encryption
     */
    serialize(data) {
      if (!key) {
        key = crypto.generateKey(secret, salt, iterations);
      }

      const { state, signature } = crypto.encryptState(data);

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
  };
};

module.exports = lowdbEncryption;
