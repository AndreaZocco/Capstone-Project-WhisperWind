const mysql = require('mysql2/promise');

exports.handler = async function (event, context) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.SSL_CERT
    }
  });

  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  } finally {
    await connection.end();
  }
};
