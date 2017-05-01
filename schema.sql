DROP DATABASE IF EXISTS data;

CREATE DATABASE data;

USE data;

CREATE TABLE songs (
  id int NOT NULL AUTO_INCREMENT,
  rating int NULL,
  tempo int,
  key_id int,
  average_changes_per_measure int,
  PRIMARY KEY (ID)
);

CREATE TABLE song_keys (
  id int NOT NULL AUTO_INCREMENT,
  key_name varchar(10) NOT NULL,
  PRIMARY KEY(ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
