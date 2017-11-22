module.exports = {
    'up': 'CREATE TABLE kanji_elements (entry_id MEDIUMINT UNSIGNED NOT NULL, kanji NVARCHAR(256), FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE)',
    'down': 'DROP TABLE kanji_elements'
}
