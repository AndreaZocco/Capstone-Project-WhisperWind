const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1);
  }
  console.log('Successfully connected to MySQL.');
});

module.exports = connection;
