const db = require('../config/db');

exports.createUser = ({ username, password, email }, callback) => {
  const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
  db.query(query, [username, password, email], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

exports.findUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};
