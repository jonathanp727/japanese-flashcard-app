module.exports = {
  up: 'CREATE TABLE users (id INT UNSIGNED NOT NULL AUTO_INCREMENT, username VARCHAR(20) UNIQUE, password VARCHAR(256), salt VARCHAR(16), isAdmin TINYINT(1), PRIMARY KEY (id))',
  down: 'DROP TABLE users'
};
