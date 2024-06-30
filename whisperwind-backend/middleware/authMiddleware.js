const { jwtVerify } = require('jose');
require('dotenv').config();

let blacklistedTokens = [];

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  if (blacklistedTokens.includes(token)) {
    return res.status(403).json({ message: 'Invalid token.' });
  }

  try {
    const { payload } = await jwtVerify(token, Buffer.from(process.env.JWT_SECRET));
    req.user = payload;
    console.log("Authenticated user:", payload);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

const logout = (req, res) => {
  const token = req.headers['authorization'];
  blacklistedTokens.push(token);
  res.json({ message: 'Logged out successfully.' });
};

module.exports = { authenticateToken, logout };
