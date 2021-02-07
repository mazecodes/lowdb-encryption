const lowdbEncryption = require('../src');

const instance = lowdbEncryption({
  secret: 's3cr3t',
});

instance.serialize();
