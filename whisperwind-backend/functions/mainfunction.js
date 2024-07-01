const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const handler = async (event) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT * FROM users");

    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ users: rows }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { handler };
