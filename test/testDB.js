const tape = require('tape');
const { addUser, blockUser } = require('../src/model/queries/users');
const { addRoom } = require('./../src/model/queries/rooms');
const db_build = require('./../src/model/database/db_build');

//  testing build database
tape('Testing Insert a new user to database', (t) => {
    db_build((err, result) => {
        if (err) {
            t.error(err);
            t.end();
        } else {
            t.equal(result.length, 10, 'the length of arrary should equal 10');
            t.equal(result[result.length - 1].command, 'COMMIT', 'the last command should be commit ');
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
    const userObject = {
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
            addRoom(userObject, (err, result) => {
                if (err) {
                    t.error(err);
                    t.end();
                } else {
                    userObject.id = 1;
                    t.deepEqual(userObject, result.rows[0], 'the result from insert should equal the inserted object extra id fields ');
                    t.end();
                }
            });
        }
    });
});

tape.onFinish = () => {
    process.exit();
};
