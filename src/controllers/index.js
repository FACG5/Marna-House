const router = require('express').Router();
const home = require('./home');
const signup = require('./signup');
const login = require('./login');

router.get('/', home.get);
router.post('/available-rooms', home.availableRooms);
router.get('/room-details/:id', home.roomDetails);
router.post('/reservations', home.addReservations);
router.get('/login', login.get);
router.post('/login', login.checkUser);


router.get('/signup', signup.get);
router.post('/signup', signup.addUser);
module.exports = router;
