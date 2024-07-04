const jwt = require('jsonwebtoken');
require('dotenv').config();

let blacklistedTokens = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  if (blacklistedTokens.includes(token)) {
    return res.status(403).json({ message: 'Invalid token.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  });
};

const logout = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  blacklistedTokens.push(token);
  res.json({ message: 'Logged out successfully.' });
};

module.exports = { authenticateToken, logout };
