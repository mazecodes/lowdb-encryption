/**
 * Validate the given options object
 *
 * @param {Object} options - Options object to validate
 * @return {void} - Throws error if something is wrong
 *
 * @example
 *   validateOptions({
 *     secret: 'secret'
 *   })
 */
const validateOptions = options => {
  if (!options.secret) {
    throw new Error('The secret must be provided');
  }

  if (typeof options.secret !== 'string') {
    throw new Error('The secret must be a string');
  }

  const { iterations } = options;

  if (iterations && typeof iterations !== 'number') {
    throw new Error('The iterations must be a number');
  }
};

module.exports = {
  validateOptions,
};
