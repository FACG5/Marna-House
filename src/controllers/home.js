const fakeData = require('./../model/fakeData');
// const {availableRooms}
exports.get = (req, res) => {
  res.render('home', {
    style: ['home', 'homeHeader', 'general', 'homeFooter', 'model'],
    title: 'Home',
    sectionType: 'single :',
    rooms: fakeData,
    script: ['home'],
  });
};
exports.availableRooms = (req, res) => {
};
