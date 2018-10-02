const tape = require('tape');
const { addUser} = require('../src/model/queries/users');
const db_build = require('./../src/model/database/db_build');

//  testing build database
tape('Testing Insert a new user to database', (t) => {
    db_build((err, result) => {
        if (err) {
            t.error(err);
            t.end();
        } else {
            t.equal(result.length, 10, 'the length of arrary should equal 10');
            t.equal(result[result.length - 1]['command'], 'COMMIT', 'the last command should be commit ');
            t.end();
        }
    })
});

// Test insert right user to database ;
tape('Testing Insert a new user to database', (t) => {
    const userObject = {
        first_name: 'ahmed',
        last_name: 'Rami',
        email_address: 'ahmed@ahmed.com'
        , phone_num: '0592528578'
    }
    db_build((err, result) => {
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
    })
});


tape.onFinish = () => {
    process.exit();
}