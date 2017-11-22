module.exports = {
    'up': 'CREATE TABLE senses (id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT, entry_id MEDIUMINT UNSIGNED NOT NULL, pos VARCHAR(256), PRIMARY KEY (id), FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE)',
    'down': 'DROP TABLE senses'
}
