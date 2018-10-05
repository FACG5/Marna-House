const db_connection = require('../database/db_connection');

const addUser = (object, callback) => {

  const {
    first_name, last_name, email_address, phone_num,
  } = object;
  const sql = {
    text: 'INSERT INTO users (first_name , last_name , email_address , phone_num ,status) VALUES ($1,$2,$3,$4,$5) returning *',
    values: [first_name, last_name, email_address, phone_num, 'new'],
  };

  db_connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};


const blockUser = (id, callback) => {

  const sql = {
    text: "UPDATE users SET status = 'block' WHERE id=$1 returning *;",
    values: [id],
  };
  db_connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { addUser, blockUser };
