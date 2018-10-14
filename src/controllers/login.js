const bcrypt = require('bcryptjs');
const { getUser } = require('./../model/queries/users');
const { sign } = require('jsonwebtoken');

exports.checkUser = (req, res, next) => {
  const userObject = req.body;
  getUser(userObject.email)
    .then((result) => {
      if (result) {
        checkPassword(result.password, userObject.password)
          .then(() => {
            makeCookie({
              email: result.email,
              username: result.username,
            })
              .then((cookieValue) => {
                res.cookie('jwt', cookieValue);
                res.send({ redirect: '/' });
              })
              .catch(() => next());
          })
          .catch(() => res.send({ error: 'Check Email Or Password' }));
      } else res.send({ error: 'Check Email Or Password ' });
    })
    .catch((err) => {
      console.log(err);
      res.send({ redirect: '/login' });
    });
};

exports.get = (req, res) => {
  res.render('login', {
    layout: 'auth', stylefile: 'login', domfile: 'login', title: 'Sign In',
  });
};

const checkPassword = (hash, password) => new Promise((resolve, reject) => {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      reject(err);
    } else if (result) {
      resolve(result);
    } else {
      reject(result);
    }
  });
});

const makeCookie = object => new Promise((resolve, reject) => {
  sign(object, process.env.SECRET, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});
