const fs = require('fs');
const { join } = require('path');
const dbConnection = require('./db_connection');

const dbBuild = () => new Promise((resolve, reject) => {
  const sql = fs.readFileSync(join(__dirname, 'db_build.sql')).toString();
  dbConnection.query(sql, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

module.exports = dbBuild;
