// db.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // set your DB user
  password: 'mysql123',         // set your DB password
  database: 'DivisionDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Simple wrapper so other files can use pool.promise()
module.exports = pool.promise();
