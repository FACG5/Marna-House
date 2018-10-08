const router = require('express').Router();
const adminLogin = require('./admin_login');
const home = require('./home');

router.get('/', home.get);
router.post('/available-rooms', home.availableRooms);
router.get('/room-details/:id', home.roomDetails);
router.get('/login', adminLogin.get);

module.exports = router;
