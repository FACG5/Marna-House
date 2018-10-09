const fakeData = require('./../model/fakeData');
const { avaliableRooms, getRoom } = require('./../model/queries/rooms');
const { addReservation } = require('./../model/queries/reservations');

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

exports.addReservation = (req, res) => {
  console.log(req.body);
  addReservation(req.body)
    .then( result => res.send({ result: res.rows })) 
    .catch((err) => {
      console.log(err)
      res.send({ Error: 'there is error' })
    });
};
