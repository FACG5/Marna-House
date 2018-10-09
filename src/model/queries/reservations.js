const db_connection = require('./../database/db_connection');

const addReservation = (object) => {
  const {
    user_id: userId, reservation_from: reservationFrom, reservation_to: reservationTo, room_id: roomId,
  } = object;
  const sql = {
    text: "insert into reservations (user_id,reservation_from,reservation_to,room_id,status) values ($1,$2,$3,$4,'underconfirm') returning * ;",
    values: [userId, reservationFrom, reservationTo, roomId],
  };
  return new Promise((resolve, reject) => {
    db_connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = { addReservation };
