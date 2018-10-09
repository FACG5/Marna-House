
-- Users 
INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('ahmed','ahmed','ahed@ah.com','0592548658','new');

INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('rami','rami','rami@ah.com','02592548658','new');

INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('hassan','hassan','hassan@ah.com','03592548658','new');

INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('jamal','jamal','jamal@ah.com','05925448658','new');

INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('mill','mill','mill@ah.com','05925486558','new');

INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('will','will','will@ah.com','05925486586','new');

INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('kanna','kanna','kanna@ah.com','05925486758','new');

INSERT INTO users
  (first_name , last_name , email_address , phone_num ,status) VALUES
  ('ahme2d','ahme2d','s133@ah.com','05925486588','new');


-- Rooms 
INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (1,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (2,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (3,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (4,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (5,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (6,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (7,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (8,'hi',100,'ww.gom','servuces','single');

INSERT INTO rooms
  (room_num,description,price,imgs,services,type) VALUES
  (9,'hi',100,'ww.gom','servuces','single');


-- reservations 
INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-05-01','2016-05-05',1,1,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-06-01','2016-06-05',2,2,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-07-01','2016-07-05',3,3,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-08-01','2016-08-05',4,4,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-09-01','2016-09-05',5,5,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-10-01','2016-10-05',6,6,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-11-01','2016-11-05',7,7,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-12-01','2016-10-05',6,6,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2016-01-01','2016-11-05',7,7,'confirmed');

INSERT INTO reservations
  (reservation_from , reservation_to , room_id , user_id,status) VALUES
  ('2018-10-08','2018-11-05',7,7,'underconfirm');