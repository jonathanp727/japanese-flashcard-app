module.exports = {
  up: 'CREATE TABLE decks (id INT UNSIGNED NOT NULL AUTO_INCREMENT, name NVARCHAR(128), user_id INT UNSIGNED NOT NULL, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)',
  down: 'DROP TABLE decks;'
};
