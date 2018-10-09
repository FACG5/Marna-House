const dbConnection = require('./../database/db_connection');
const utilities = require('./utilities');

const addRoom = (object) => {
  const {
    room_num: roomNum,
    description,
    price,
    imgs,
    services,
    type,
  } = object;

  const sql = {
    text: 'INSERT INTO rooms (room_num,description,price,imgs,services,type) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ;',
    values: [roomNum, description, price, imgs, services, type],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const deleteRoom = (id) => {
  const sql = {
    text: 'DELETE FROM rooms WHERE id =$1 RETURNING *;',
    values: [id],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const getRoom = (id) => {
  const sql = {
    text: 'select * from rooms where id=$1',
    values: [id],
  };

  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const updateRoom = (object) => {
  const {
    room_num: roomNum, description, price, imgs, services, type,
  } = object;
  return new Promise((resolve, reject) => {
    const sql = {
      text: ' UPDATE rooms SET description = $2 , price = $3 , imgs = $4 ,services = $5, type = $6  WHERE room_num = $1;',
      values: [roomNum, description, price, imgs, services, type],
    };
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rowCount);
      }
    });
  });
};

const avaliableRooms = (object) => {
  const sql = {
    text: "select rooms.id,rooms.imgs , rooms.room_num , rooms.price ,  reservations.reservation_from , reservations.reservation_to ,reservations.status   from rooms left join reservations ON reservations.room_id = rooms.id where ( rooms.type = $1 ) and ( ( reservations.status = 'confirmed') or (reservations.status is null) ) order by rooms.id",
    values: [object.type],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const from = new Date(object.from);
        const to = new Date(object.to);
        const filteredResult = utilities.filterResult(from, to, result.rows);
        const finalResult = utilities.removeDuplicated(filteredResult);
        resolve(finalResult);
      }
    });
  });
};

module.exports = {
  addRoom, deleteRoom, getRoom, updateRoom, avaliableRooms,
};
