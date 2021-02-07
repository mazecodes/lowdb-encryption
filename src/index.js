const lowdbEncryption = (options = {}) => {
  const { secret } = options;
  const iterations = options.iterations || 100000;

  return {
    serialize() {
      console.log('Hello World');
    },
  };
};

module.exports = lowdbEncryption;
