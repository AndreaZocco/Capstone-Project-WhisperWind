const db = require('../config/db');

exports.findUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};

exports.findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};

exports.findUserByExternalId = (external_id, external_type, callback) => {
  const query = 'SELECT * FROM users WHERE external_id = ? AND external_type = ?';
  db.query(query, [external_id, external_type], (err, results) => {
    if (err) {
      console.error('Database error in findUserByExternalId:', err);
      return callback(err);
    }
    console.log('findUserByExternalId results:', results);
    callback(null, results[0]);
  });
};

exports.createUser = ({ username, password, email, external_id = null, external_type = null }, callback) => {
  console.log('Attempting to create user:', { username, email, external_id, external_type });
  const query = 'INSERT INTO users (username, password, email, external_id, external_type) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [username, password, email, external_id, external_type], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      console.error('Error details:', err.sqlMessage);
      return callback(err);
    }
    console.log('User created successfully:', result);
    callback(null, result);
  });
};
