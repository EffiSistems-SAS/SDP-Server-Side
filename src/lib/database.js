const { Pool } = require("pg");
const keys = require("../private/keys");
const pool = new Pool(keys);
const {promisify} = require("util");

pool.connect((err, client, done) => {
  if (err) throw err;
  else done();
});

module.exports = pool;