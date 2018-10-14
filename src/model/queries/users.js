const dbConnection = require('../database/db_connection');

const addUser = (object) => {

  const { username, email, password } = object;
  const sql = {
    text: "INSERT INTO users (username,email,isAdmin,password,status) VALUES($1,$2,false, $3,'new')returning * ",
    values: [username, email, password],
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
const getUser = (email) => {
  const sql = {
    text: 'select * from users where email = $1',
    values: [email],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows[0]);
      }
    });
  });
};

module.exports = { addUser, blockUser, getUser };
