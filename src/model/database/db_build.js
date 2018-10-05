const fs = require('fs');
const { join } = require('path');
const db_connection = require('./db_connection');

const db_build = (callback) => {
  const sql = fs.readFileSync(join(__dirname, 'db_build.sql')).toString();
  db_connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

module.exports = db_build;