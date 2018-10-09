const router = require('express').Router();
const home = require('./home');


router.get('/', home.get);
router.post('/available-rooms', home.availableRooms);
router.get('/room-details/:id', home.roomDetails);
router.post('/reservations', home.addReservations);

module.exports = router;
