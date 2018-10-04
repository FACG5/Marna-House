const dbConnection = require('../database/db_connection');

const addUser = (object) => {

  const {
    first_name: firstName,
    last_name: lastName,
    email_address: emailAddress,
    phone_num: phoneNum,
  } = object;
  const sql = {
    text: 'INSERT INTO users (first_name , last_name , email_address , phone_num ,status) VALUES ($1,$2,$3,$4,$5) returning *',
    values: [firstName, lastName, emailAddress, phoneNum, 'new'],
  };
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


const blockUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = {
      text: "UPDATE users SET status = 'block' WHERE id=$1 returning *;",
      values: [id],
    };
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { addUser, blockUser };
