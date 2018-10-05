const router = require('express').Router();
const home = require('./home');

router.get('/', home.get);
module.exports = router;
