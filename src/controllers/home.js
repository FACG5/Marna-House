const data = [
  {
    id: 1,
    room_num: 2,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 1,
    room_num: 2,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 1,
    room_num: 2,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 1,
    room_num: 2,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 1,
    room_num: 2,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 1,
    room_num: 2,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 1,
    room_num: 2,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 2,
    room_num: 3,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'single',
  },
  {
    id: 3,
    room_num: 4,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'double',
  },
  {
    id: 4,
    room_num: 5,
    description: 'nice room',
    price: 500,
    imgs: 'room.jpg',
    services: 'some servieces',
    type: 'triple',
  },
];

exports.get = (req, res) => {
  // filter the data based on the room type
  const filteredData = {
    single: data.filter(room => room.type === 'single'),
    double: data.filter(room => room.type === 'double'),
    triple: data.filter(room => room.type === 'triple'),
  };

  res.render('home', {
    style: 'style',
    style_special: 'home',
    title: 'Home',
    script: 'home',
    data: filteredData,
  });
};
