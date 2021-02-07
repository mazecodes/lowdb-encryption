const { validateOptions } = require('./lib/validator');
const crypto = require('./lib/crypto');

const lowdbEncryption = (options = {}) => {
  validateOptions(options);

  const { secret } = options;
  let iterations = options.iterations || 100000;

  let salt = crypto.generateSalt();
  let key;

  return {
    /**
     * Encryption
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
     * Decryption
     */
    deserialize(data) {
      const json = JSON.parse(data);

      if (!json._encryption) {
        return json;
      }

      const { salt: _salt, iterations: _iterations } = json._encryption;

      salt = _salt || salt;
      iterations = typeof _iterations === 'number' ? _iterations : iterations;

      if (!key) {
        key = crypto.generateKey(secret, salt, iterations);
      }

      const stateContent = json.state.content;
      const stateSignature = json.state.signature;

      if (!stateContent || !stateSignature) {
        throw new Error('The state is not valid');
      }

      const isSignatureValid = crypto.isSignatureValid(
        stateContent,
        stateSignature,
        key
      );

      if (!isSignatureValid) {
        throw new Error('The state has been altered');
      }

      const decryptedState = crypto.decryptState(stateContent, key);

      return JSON.parse(decryptedState);
    },
  };
};

module.exports = lowdbEncryption;
