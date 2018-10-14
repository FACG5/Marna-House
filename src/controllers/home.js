const fakeData = require('./../model/fakeData');
const { avaliableRooms, getRoom } = require('./../model/queries/rooms');
const { addReservation } = require('./../model/queries/reservations');
const { addUser, getUser } = require('./../model/queries/users');

exports.get = (req, res) => {
  res.render('home', {
    style:
      [
        'home',
        'homeHeader',
        'general',
        'homeFooter',
        'model',
      ],
    title: 'Home',
    sectionType: 'single :',
    rooms: fakeData,
    script: ['home'],
    loginstatus: (req.unlockCookie === null) ? true : false , 
    username: (req.unlockCookie === null) ? '' : req.unlockCookie.username,
  });
};

exports.signout = (req, res) => {
  res.cookie('jwt', 'nothing', { maxAge: 0 });
  res.redirect('/');
}
exports.availableRooms = (req, res) => {
  avaliableRooms(req.body)
    .then((result) => {
      res.send({ result });
    })
    .catch(() => res.send({ Error: 'there is error' }));
};

exports.roomDetails = (req, res) => {
  getRoom(req.params.id)
    .then(room => res.send({ result: room.rows }))
    .catch(() => res.send({ Error: 'there is error' }));
};

exports.addReservations = (req, res) => {
  if (!req.unlockCookie) {
    return res.send({ redirect: '/login' });
  }
  getUser(req.unlockCookie.email)
    .then((result) => {
      const { id: user_id } = result;
      const { rooms } = req.body;
      let counter = 0;
      const resArray = [];
      rooms.forEach((room) => {
        avaliableRooms(room.selectedTime)
          .then((result) => {
            const roomIds = result.map(item => item.id);
            if (roomIds.includes(Number(room.roomNum))) {
              addReservation({
                user_id,
                reservation_from: room.selectedTime.from,
                reservation_to: room.selectedTime.to,
                room_id: room.roomNum,
              })
                .then((reservationRes) => {
                  resArray.push({ room_id: room.roomNum, msg: 'Room Bocked Sucssesfully' });
                  counter += 1;
                  if (counter === rooms.length) {
                    res.send(resArray);
                  }
                });
            } else {
              resArray.push({ room_id: room.roomNum, error: 'This Room Is Not Available Choose Another One !' });
              counter += 1;
              if (counter === rooms.length) {
                res.send(resArray);
              }
            }
          })
          .catch(() => res.send({ error: 'There Is Error' }));
      });
    });
};
