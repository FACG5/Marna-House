const dbConnection = require('./../database/db_connection');

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

const removeDuplicated = (allRooms) => {
  const filterdRooms = [];
  for (let i = 0; i < allRooms.length; i += 1) {
    filterdRooms[i] = {
      number: allRooms[i].room_num,
      price: allRooms[i].price,
    };
    let j = 1;
    while ((allRooms[i + j] !== undefined) && (allRooms[i].id === allRooms[i + j].id)) {
      allRooms.splice((i + j), 1);
    }
    j = 1;
  }
  return (filterdRooms);
};

const filterResult = (from, to, allResult) => {
  const array = allResult.slice(0);
  for (let i = 0; i < array.length; i += 1) {
    if ((from < array[i].reservation_from && array[i].reservation_from < to)) {
      array.splice(i, 1);
      i -= 1;
    } else if ((from < array[i].reservation_to && array[i].reservation_to < to)) {
      array.splice(i, 1);
      i -= 1;
    }
  }
  return removeDuplicated(array);
};

const avaliableRooms = (object) => {
  const sql = {
    text: "select rooms.id , rooms.room_num , rooms.price ,  reservations.reservation_from , reservation_to ,reservations.status   from rooms left join reservations ON reservations.room_id = rooms.id where rooms.type = $1 and( reservations.status = 'confirmed') or (reservations.status is null)  order by rooms.id",
    values: [object.type],
  };
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const from = new Date(object.from);
        const to = new Date(object.to);
        const finalResult = filterResult(from, to, result.rows);
        resolve(finalResult);
      }
    });
  });
};

module.exports = {
  addRoom, deleteRoom, getRoom, updateRoom, avaliableRooms,
};
