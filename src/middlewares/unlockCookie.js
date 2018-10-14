const { verify } = require('jsonwebtoken');
exports.unlockCookie = (req, res, next) => {
  const jwt = req.cookies['jwt'];
  if (jwt) {
    verify(jwt, process.env.SECRET, (err, result) => {
      req.unlockCookie = result;
    });
  } else {
    req.unlockCookie = null;
  }
  next();
};
