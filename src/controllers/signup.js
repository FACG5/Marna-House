const bcrypt = require('bcryptjs');

const usersQueries = require('./../model/queries/users');

exports.addUser = (req, res) => {
  const userObject = req.body;
  hashingPassword(userObject.password)
    .then((hash) => {
      userObject.password = hash;
      return usersQueries.addUser(userObject);
    })
    .then(() => res.send({ redirect: '/login' }))
    .catch((err) => {
      if (err.code === '23505') {
        res.send({ error: 'The Email Address Is Alreadt Taken' });
      } else {
        res.send({ error: 'Sorry We Have A Error' });
      }
    });
};

exports.get = (req, res) => {
  res.render('signup', {
    layout: 'auth', stylefile: 'signup', domfile: 'signup', title: 'Sign In',
  });
};

const hashingPassword = password => new Promise((resolve, reject) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      reject(err);
    } else {
      bcrypt.hash(password, salt, (hashErr, hash) => {
        if (hashErr) {
          reject(hashErr);
        } else {
          resolve(hash);
        }
      });
    }
  });
});
