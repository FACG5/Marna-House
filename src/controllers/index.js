const router = require('express').Router();
const home = require('./home');


console.log(1);
router.get('/', home.get);
router.post('/available-rooms', home.availableRooms);
router.get('/room-details/:id', home.roomDetails);
router.post('/addreservation', home.addReservation);
module.exports = router;
