CREATE DATABASE user_database;
USE user_database;

CREATE TABLE users (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);