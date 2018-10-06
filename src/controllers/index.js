const router = require('express').Router();
const home = require('./home');

router.get('/', home.get);
router.post('/available-rooms', home.availableRooms);
module.exports = router;
