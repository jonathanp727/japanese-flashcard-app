module.exports = {
  up: 'CREATE TABLE flashcards (id INT UNSIGNED NOT NULL AUTO_INCREMENT, kanji NVARCHAR(256), reading VARCHAR(64), pos VARCHAR(256), gloss VARCHAR(1024), deck_id INT UNSIGNED NOT NULL, PRIMARY KEY(id), FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE)',
  down: 'DROP TABLE flashcards;'
};
