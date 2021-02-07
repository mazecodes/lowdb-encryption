const { validateOptions } = require('./lib/validator');

const lowdbEncryption = (options = {}) => {
  validateOptions(options);

  const { secret } = options;
  const iterations = options.iterations || 100000;

  return {
    serialize() {
      console.log('Hello World');
    },
  };
};

module.exports = lowdbEncryption;
