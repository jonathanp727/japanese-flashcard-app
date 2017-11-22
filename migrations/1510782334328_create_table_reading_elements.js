module.exports = {
    'up': 'CREATE TABLE reading_elements (entry_id MEDIUMINT UNSIGNED NOT NULL, reading VARCHAR(64), FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE)',
    'down': 'DROP TABLE reading_elements'
}
