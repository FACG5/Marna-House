const tape = require('tape');
const { addUser, blockUser } = require('../src/model/queries/users');
const { addRoom, deleteRoom, getRoom } = require('./../src/model/queries/rooms');
const db_build = require('./../src/model/database/db_build');


//  testing build database
tape('Testing build database ', (t) => {
  db_build((err, result) => {
    if (err) {
      t.error(err);
      t.end();
    } else {
      t.end();
    }
  });
});

// Test insert right user to database ;
tape('Testing Insert a new user to database', (t) => {
  const userObject = {
    first_name: 'ahmed',
    last_name: 'Rami',
    email_address: 'ahmed@ahmed.com',
    phone_num: '0592528578',
  };
  db_build((err) => {
    if (err) {
      t.error(err);
      t.end();
    } else {
      addUser(userObject, (err, result) => {
        if (err) {
          t.error(err);
          t.end();
        } else {
          userObject.status = 'new';
          userObject.id = 1;
          t.deepEqual(userObject, result.rows[0], 'the result from insert should equal the inserted object extra status,id fields ');
          t.end();
        }
      });
    }
  });
});

// Test Block exitent user ;
tape('Testing  Block exitent user', (t) => {
  const userObject = {
    first_name: 'ahmed',
    last_name: 'Rami',
    email_address: 'ahmed@ahmed.com',
    phone_num: '0592528578',
  };
  db_build((err) => {
    if (err) {
      t.error(err);
      t.end();
    } else {
      addUser(userObject, (err, result) => {
        if (err) {
          t.error(err);
          t.end();
        } else {
          userObject.status = 'new';
          userObject.id = 1;
          t.deepEqual(userObject, result.rows[0], 'the result from insert should equal the inserted object extra status,id fields ');
          blockUser(1, (err, result) => {
            if (err) {
              t.error(err);
            } else {
              userObject.status = 'block';
              t.deepEqual(userObject, result.rows[0], 'the result from block should equal have status field with block value ');
              t.end();
            }
          });
        }
      });
    }
  });
});


// Test insert new room to database ;
tape('Testing Insert a new room to database', (t) => {
  const roomObject = {
    room_num: 1,
    description: 'first decsription',
    price: 100,
    imgs: 'img url',
    services: 'first serveices',
    type: 'single',

  };
  db_build((err, result) => {
    if (err) {
      t.error(err);
      t.end();
    } else {
      addRoom(roomObject, (err, result) => {
        if (err) {
          t.error(err);
          t.end();
        } else {
          roomObject.id = 1;
          t.deepEqual(roomObject, result.rows[0], 'the result from insert should equal the inserted object extra id fields ');
          t.end();
        }
      });
    }
  });
});
// Test insert new room to database ;
tape('Testing Insert a new room to database', (t) => {
  const roomObject = {
    room_num: 1,
    description: 'first decsription',
    price: 100,
    imgs: 'img url',
    services: 'first serveices',
    type: 'single',

  };
  db_build((err, result) => {
    if (err) {
      t.error(err);
      t.end();
    } else {
      addRoom(roomObject, (err, result) => {
        if (err) {
          t.error(err);
          t.end();
        } else {
          roomObject.id = 1;
          getRoom(1, (err, result) => {
            if (err) {
              t.error(err);
            } else {
              t.deepEqual(roomObject, result.rows[0], 'Testing Select Room from database');
              t.end();
            }

          });
        }
      });
    }
  });
});

// Test insert new room to database ;
tape('Testing Insert a new room to database', (t) => {
  const roomObject = {
    room_num: 1,
    description: 'first decsription',
    price: 100,
    imgs: 'img url',
    services: 'first serveices',
    type: 'single',

  };
  db_build((err, result) => {
    if (err) {
      t.error(err);
      t.end();
    } else {
      addRoom(roomObject, (err, result) => {
        if (err) {
          t.error(err);
          t.end();
        } else {
          const id = 1;
          deleteRoom(id, (err, result) => {
            if (err) {
              t.error();
            } else {
              roomObject.id = 1;
              t.equal(1, result.rows.length, 'the length of array should equal 1');
              t.deepEqual(roomObject, result.rows[0], 'the result from database should be row with data for room with id equal 1');
              t.end();
            }
          });
        }
      });
    }
  });
});


tape.onFinish = () => {
  process.exit();
};
