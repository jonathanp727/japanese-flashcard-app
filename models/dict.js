const dbUtil = require('../helpers/dbUtil.js');

exports.jToE = (item, callback) => {
  dbUtil.getDb().query(`SELECT * FROM entries e LEFT OUTER JOIN kanji_elements k on e.id = k.entry_id LEFT OUTER JOIN reading_elements r on e.id = r.entry_id INNER JOIN senses s on e.id = s.entry_id INNER JOIN glosses g on s.id = g.sense_id WHERE k.kanji="${item}" OR r.reading="${item}";`, (err, result) => {
    callback(err, result);
  });
};

exports.eToJ = (item, callback) => {
  dbUtil.getDb().query(`SELECT * FROM entries e LEFT OUTER JOIN kanji_elements k on e.id = k.entry_id LEFT OUTER JOIN reading_elements r on e.id = r.entry_id INNER JOIN senses s on e.id = s.entry_id INNER JOIN glosses g on s.id = g.sense_id WHERE g.gloss LIKE "%${item}%"`, (err, result) => {
    callback(err, result);
  });
};
