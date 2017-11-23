module.exports = {
  up: 'ALTER TABLE reading_elements CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;',
  down: 'ALTER TABLE reading_elements CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
};
