const dbUtil = require('../helpers/dbUtil.js');

exports.all = (callback) => {
  dbUtil.getDb().query(`SELECT * FROM decks;`, (err, result) => {
    callback(err, result);
  });
};

exports.user = (userId, callback) => {
  dbUtil.getDb().query(`SELECT * FROM decks WHERE user_id=${userId};`, (err, result) => {
    callback(err, result);
  });
};

exports.get = (id, callback) => {
  dbUtil.getDb().query(`SELECT * FROM decks WHERE id=${id};`, (err, result) => {
    callback(err, result);
  });
};

exports.new = (name, userId, callback) => {
  dbUtil.getDb().query(`INSERT INTO decks (name, user_id) VALUES ("${name}", ${userId});`, (err, result) => {
    callback(err, result);
  });
};

exports.update = (id, newName, newUserId, callback) => {
  dbUtil.getDb().query(`UPDATE decks SET name="${newName}", user_id=${newUserId} WHERE id=${id}`, (err, result) => {
    callback(err, result);
  });
};

exports.delete = (id, callback) => {
  dbUtil.getDb().query(`DELETE FROM decks WHERE id=${id}`, (err, result) => {
    callback(err, result);
  });
};
