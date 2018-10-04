const tape = require('tape');
const { addUser, blockUser } = require('../src/model/queries/users');
const {
  addRoom, deleteRoom, getRoom, updateRoom, avaliableRooms,
} = require('./../src/model/queries/rooms');
const dbBuild = require('./../src/model/database/db_build');
const dbFackData = require('./../src/model/database/db_fackData');

//  testing build database
tape('Testing build database ', (t) => {
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'the result should not equal undefined');
      t.end();
    })
    .catch(err => t.error(err));
});

// Test insert right user to database ;
tape('Testing Insert a new user to database', (t) => {
  const userObject = {
    first_name: 'ahmed',
    last_name: 'Rami',
    email_address: 'ahmed@ahmed.com',
    phone_num: '0592528578',
  };
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'the result should not equal undefined');
      return addUser(userObject);
    })
    .then((result) => {
      userObject.status = 'new';
      userObject.id = 1;
      t.deepEqual(userObject, result.rows[0], 'the result from insert should equal the inserted object extra status,id fields ');
      t.end();
    })
    .catch(err => t.error(err));
});
// Test Block exitent user ;
tape('Testing  Block exitent user', (t) => {
  const userObject = {
    first_name: 'ahmed',
    last_name: 'Rami',
    email_address: 'ahmed@ahmed.com',
    phone_num: '0592528578',
  };
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'the result should not equal undefined');
      return addUser(userObject);
    })
    .then((result) => {
      userObject.status = 'new';
      userObject.id = 1;
      t.deepEqual(userObject, result.rows[0], 'the result from insert should equal the inserted object extra status,id fields ');
      return blockUser(1);
    })
    .then((result) => {
      userObject.status = 'block';
      t.deepEqual(userObject, result.rows[0], 'the result from block should equal have status field with block value ');
      t.end();
    })
    .catch(err => t.error(err));
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

  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'the result should not equal undefined');
      return addRoom(roomObject);
    })
    .then((result) => {
      roomObject.id = 1;
      t.deepEqual(roomObject, result.rows[0], 'the result from insert should equal the inserted object extra id fields ');
      t.end();
    })
    .catch(err => t.error(err));
});

// Testing get room from database ;
tape('Testing get room from database', (t) => {
  const roomObject = {
    room_num: 1,
    description: 'first decsription',
    price: 100,
    imgs: 'img url',
    services: 'first serveices',
    type: 'single',
  };
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'the result should not equal undefined');
      return addRoom(roomObject);
    })
    .then((result) => {
      roomObject.id = 1;
      t.deepEqual(roomObject, result.rows[0], 'the result from insert should equal the inserted object extra id fields ');
      return getRoom(1);
    })
    .then((result) => {
      t.deepEqual(roomObject, result.rows[0], 'Testing Select Room from database');
      t.end();
    })
    .catch(err => t.error(err));
});


// Testing delete  room from database
tape('Testing delete  room from database', (t) => {
  const roomObject = {
    room_num: 1,
    description: 'first decsription',
    price: 100,
    imgs: 'img url',
    services: 'first serveices',
    type: 'single',
  };

  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'the result should not equal undefined');
      return addRoom(roomObject);
    })
    .then((result) => {
      roomObject.id = 1;
      t.deepEqual(roomObject, result.rows[0], 'the result from insert should equal the inserted object extra id fields ');
      return deleteRoom(roomObject.id);
    })
    .then((result) => {
      t.equal(1, result.rows.length, 'the length of array should equal 1');
      t.deepEqual(roomObject, result.rows[0], 'the result from database should be row with data for room with id equal 1');
      t.end();
    })
    .catch(err => t.error(err));
});

// Testing update exists room in database ;
tape('Testing update exists room in database', (t) => {
  const roomObject = {
    room_num: 1,
    description: 'first decsription',
    price: 100,
    imgs: 'img url',
    services: 'first serveices',
    type: 'single',

  };
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'the result should not equal undefined');
      return addRoom(roomObject);
    })
    .then((result) => {
      const object = Object.assign({}, result.rows[0]);
      object.description = 'update';

      return updateRoom(object);
    })
    .then((rowCount) => {
      roomObject.id = 1;
      t.equal(1, rowCount, 'The Number of Effected Rows Should Be 1 ');
      t.end();
    })
    .catch(err => t.error(err));
});


// Testing get Available Rooms ;
tape('Testing get Available Rooms ', (t) => {
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return dbFackData();
    })
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return avaliableRooms({ from: '2015-05-01', to: '2019-06-02', type: 'single' });
    })
    .then((result) => {
      t.deepEqual([{ number: 8, price: 100 }, { number: 9, price: 100 }], result, 'the result should be 2 Rooms');
      t.end();
    })
    .catch(err => t.error(err));
});

// Testing get Available Rooms;
tape('Testing get Available Rooms', (t) => {
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return dbFackData();
    })
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return avaliableRooms({ from: '2016-05-01', to: '2016-05-05', type: 'single' });
    })
    .then((result) => {
      t.deepEqual([
        { number: 2, price: 100 },
        { number: 3, price: 100 },
        { number: 4, price: 100 },
        { number: 5, price: 100 },
        { number: 6, price: 100 },
        { number: 7, price: 100 },
        { number: 8, price: 100 },
        { number: 9, price: 100 }],
      result, 'the result should be 8 (from room 2 to room 9) Rooms');
      t.end();
    })
    .catch(err => t.error(err));
});

// Testing get Available Rooms ;
tape('Testing get Available Rooms', (t) => {
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return dbFackData();
    })
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return avaliableRooms({ from: '2016-05-01', to: '2016-06-06', type: 'single' });
    })
    .then((result) => {
      t.deepEqual([
        { number: 3, price: 100 },
        { number: 4, price: 100 },
        { number: 5, price: 100 },
        { number: 6, price: 100 },
        { number: 7, price: 100 },
        { number: 8, price: 100 },
        { number: 9, price: 100 }],
      result, 'the result should be 7 (from room 3 to room 9) Rooms');
      t.end();
    })
    .catch(err => t.error(err));
});

// Testing get Available Room ;
tape('Testing get Available Rooms', (t) => {
  dbBuild()
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return dbFackData();
    })
    .then((result) => {
      t.notEqual(result, undefined, 'The Result from add fack data should be not equal undefiend');
      return avaliableRooms({ from: '2017-05-01', to: '2017-06-06', type: 'single' });
    })
    .then((result) => {
      t.deepEqual([
        { number: 1, price: 100 },
        { number: 2, price: 100 },
        { number: 3, price: 100 },
        { number: 4, price: 100 },
        { number: 5, price: 100 },
        { number: 6, price: 100 },
        { number: 7, price: 100 },
        { number: 8, price: 100 },
        { number: 9, price: 100 }],
      result, 'the result should be all Rooms ');
      t.end();
    })
    .catch(err => t.error(err));
});
tape.onFinish = () => {
  process.exit();
};
