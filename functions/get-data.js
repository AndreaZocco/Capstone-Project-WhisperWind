const mysql = require('mysql2/promise');
require('dotenv').config();

exports.handler = async function (event, context) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  } finally {
    await connection.end();
  }
};
