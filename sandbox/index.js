const lowdb = require('lowdb');
const lowdbEncryption = require('../src');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json', {
  ...lowdbEncryption({
    secret: 'secret',
  }),
});
const db = lowdb(adapter);

db.defaults({ posts: [] }).write();

// db.get('posts')
//   .push({
//     title: 'Hello World',
//     content: 'This is a test',
//   })
//   .write();

console.log(db.get('posts').value());
