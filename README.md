<div align="center">
  <h1>Lowdb Encryption</h1>
  <p><i>Lowdb add-on for ecnryption.</i></p>
</div><br>

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Encryption Details](#encryption-details)
- [Contributing](#contributing)
- [Author](#author)
- [Support](#show-your-support)
- [License](#license)

## Install

npm:

```bash
npm install lowdb-encryption
```

Yarn:

```bash
yarn add lowdb-encryption
```

GitHub:

```bash
git clone https://github.com/mazecodes/lowdb-encryption.git
```

## Usage

```javascript
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const lowdbEncryption = require('lowdb-encryption');

const adapter = new FileSync('db.json', {
  ...lowdbEncryption({
    secret: 's3cr3t',
    iterations: 100_000,
  }),
});

const db = lowdb(adapter);
```

`iterations` is the number of iterations used for key derivation. The encryption key will be derived from `secret`. (`iterations` is set to 100,000 by default)

## Encryption Details

Lowdb Encryption uses **PBKDF2** for key derivation with `100,000` iterations set by default and uses **AES256** in **CBC mode** for encryption. It also uses **HMAC-SHA256** for signing and validation the state.
