const fs = require('fs');
const { join } = require('path');
const dbConnection = require('./db_connection');

const dbFackData = () => {
  const sql = fs.readFileSync(join(__dirname, 'fackData.sql')).toString();
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = dbFackData;
