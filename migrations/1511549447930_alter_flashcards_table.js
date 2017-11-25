module.exports = {
  up: 'ALTER TABLE flashcards CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci',
  down: 'ALTER TABLE flashcards CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
};
