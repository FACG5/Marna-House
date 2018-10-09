const fakeData = require('./../model/fakeData');
const { avaliableRooms, getRoom } = require('./../model/queries/rooms');
const { addReservation } = require('./../model/queries/reservations');
const { addUser } = require('./../model/queries/users');

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
  });
};

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
  const {
    firstName: first_name,
    lastName: last_name,
    phoneNum: phone_num,
    emailAddress: email_address,
  } = req.body.userInfo;
  addUser({
    first_name, last_name, phone_num, email_address,
  })
    .then((result) => {
      const { id: user_id } = result.rows[0];
      const { rooms, from: reservation_from, to: reservation_to } = req.body;
      let counter = 0;
      const resArray = [];
      rooms.forEach((room_id) => {
        addReservation({
          user_id, reservation_from, reservation_to, room_id,
        })
          .then((reservationRes) => {
            resArray.push({ room_id, msg: 'room bocked sucssesfully' });
            counter += 1;
            if (counter === rooms.length) {
              res.send(resArray);
            }
          })
          .catch((err) => {
            resArray.push({ room_id, error: 'this roome not available choose another one !' });
            counter += 1;
            if (counter === rooms.length) {
              res.send(resArray);
            }
          });
      });
    });
};
