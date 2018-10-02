BEGIN; 

DROP TABLE IF EXISTS users , reservations , rooms CASCADE ;

CREATE TABLE users(
    id serial primary key ,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email_address VARCHAR(50) UNIQUE NOT NULL  ,
    phone_num INTEGER UNIQUE NOT NULL,
    status VARCHAR(10) NOT NULL
);

CREATE TABLE rooms(
    id serial primary key ,
    room_num INTEGER NOT NULL,
    description TEXT ,
    price integer NOT NULL  ,
    imgs text ,
    services text ,
    type VARCHAR(20)
);

CREATE TABLE reservations(
    id serial primary key ,
    from TIMESTAMP NOT NULL,
    to TIMESTAMP NOT NULL ,
    room_id INTEGER REFERENCES rooms(id) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    status VARCHAR(20) NOT NULL,
);

COMMIT ;
