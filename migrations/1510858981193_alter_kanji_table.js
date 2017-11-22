module.exports = {
    'up': 'ALTER TABLE kanji_elements CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci',
    'down': 'ALTER TABLE kanji_elements CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
}