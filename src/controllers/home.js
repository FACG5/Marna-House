const fakeData = require('./../model/fakeData');
const { avaliableRooms, getRoom } = require('./../model/queries/rooms');

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
    Header: true,
    Footer: true,
    home_page: true,
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
