module.exports = {
  up: 'CREATE TABLE glosses (sense_id MEDIUMINT UNSIGNED NOT NULL, gloss VARCHAR(512), FOREIGN KEY (sense_id) REFERENCES senses(id) ON DELETE CASCADE)',
  down: 'DROP TABLE glosses'
};
