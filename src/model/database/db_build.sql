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

COMMIT ;
