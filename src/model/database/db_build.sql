BEGIN; 

DROP TABLE IF EXISTS users , reservations , rooms ,admin CASCADE ;
DROP TYPE IF EXISTS  reservation_status,room_type,user_status;

CREATE TYPE room_type AS ENUM('single','double','triple');
CREATE TYPE reservation_status AS ENUM('unconfirm','underconfirm','confirmed');
CREATE TYPE user_status AS ENUM('new','block','confirmed');

CREATE TABLE users(
    id serial primary key ,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL  ,
    password VARCHAR(100) NOT NULL,
    status user_status NOT NULL,
    isAdmin boolean not null
);

CREATE TABLE rooms(
    id serial primary key ,
    room_num INTEGER NOT NULL,
    description TEXT ,
    price integer NOT NULL  ,
    imgs text ,
    services text ,
    type room_type
);

CREATE TABLE reservations(
    id serial primary key,
    reservation_from TIMESTAMP NOT NULL,
    reservation_to TIMESTAMP NOT NULL ,
    room_id INTEGER REFERENCES rooms(id) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    status reservation_status NOT NULL
);




INSERT INTO users (username,email,isAdmin,password,status) VALUES
  ('admin','admin@admin.com',true,'$2b$10$brlqvEWThoj9laHRZbkGUeZd7RDNKVmdEckKiPbVsoWYJDQIqrfpu','confirmed'); 



COMMIT ;
