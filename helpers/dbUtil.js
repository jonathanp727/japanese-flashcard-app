const mysql = require('mysql');

let con;

module.exports = {

  connectToServer() {
    con = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'mysqlpass',
      database: 'flashcards'
    });
  },

  query(querystring, callback) {
    con.query(querystring, (err, result) => {
      callback(err, result);
    });
  },

  getDb() {
    return con;
  }
};
