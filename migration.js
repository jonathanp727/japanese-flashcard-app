const mysql = require('mysql');
const migration = require('mysql-migrations');
const path = require('path');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'mysqlpass',
  database: 'flashcards'
});

migration.init(connection, path.join(__dirname, '/migrations'));
