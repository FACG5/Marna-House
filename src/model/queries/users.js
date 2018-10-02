const db_connection = require('./../database/db_connection.');

const addUser = (object, callback) => {
    const { first_name, last_name, email_address, phone_num } = object;
    const sql = {
        text: 'INSERT INTO users (first_name , last_name , email_address , phone_num) VALUES ($1,$2,$3,$4)',
        values: [first_name, last_name, email_address, phone_num]
    }
    console.log([first_name, last_name, email_address, phone_num]);
    db_connection.query(sql, (err, result) => {
        if (err)
            console.log(err)
        else
            console.log(result);
    });
}

addUser({
    first_name: 'ahmed',
    last_name: 'rami',
    email_address: 'ahmed@ahmed.com',
    phone_num: '059286449',
})