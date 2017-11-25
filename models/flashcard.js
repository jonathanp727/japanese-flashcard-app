const dbUtil = require('../helpers/dbUtil.js');

exports.all = (callback) => {
  dbUtil.getDb().query(`SELECT * FROM flashcards;`, (err, result) => {
    callback(err, result);
  });
};

exports.deck = (deckId, callback) => {
  dbUtil.getDb().query(`SELECT * FROM flashcards WHERE deck_id=${deckId};`, (err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  dbUtil.getDb().query(`SELECT * FROM flashcards WHERE id=${id};`, (err, result) => {
    callback(err, result);
  });
};

exports.new = (kanji, reading, pos, gloss, deckId, callback) => {
  dbUtil.getDb().query(`INSERT INTO flashcards (kanji, reading, pos, gloss, deck_id) VALUES ("${kanji}", "${reading}", "${pos}", "${gloss}", ${deckId});`, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newKanji, newReading, newPos, newGloss, newDeckId, callback) => {
  dbUtil.getDb().query(`UPDATE flashcards SET kanji="${newKanji}", reading="${newReading}", pos="${newPos}", gloss="${newGloss}", deck_id=${newDeckId} WHERE id=${id}`, (err, result) => {
    callback(err, result);
  });
};

exports.delete = (id, callback) => {
  dbUtil.getDb().query(`DELETE FROM flashcards WHERE id=${id}`, (err, result) => {
    callback(err, result);
  });
};
