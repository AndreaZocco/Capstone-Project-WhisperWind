const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const registerUser = async (req, res) => {
  const { username, password, email, preferences } = req.body;
  const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : null;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, email, created_at, avatar, preferences) VALUES (?, ?, ?, NOW(), ?, ?)';
    const [result] = await connection.query(query, [username, hashedPassword, email, avatar, preferences]);

    const user = { id: result.insertId, username, email, avatar, preferences };
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { username: user.username, email: user.email, created_at: new Date(), avatar, preferences } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [rows] = await connection.query('SELECT username, email, created_at, avatar, preferences FROM users WHERE id = ?', [userId]);
    const user = rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const { preferences } = req.body;
  const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : null;

  try {
    const query = avatar ? 
      'UPDATE users SET preferences = ?, avatar = ? WHERE id = ?' :
      'UPDATE users SET preferences = ? WHERE id = ?';
    
    const params = avatar ? [preferences, avatar, userId] : [preferences, userId];

    await connection.query(query, params);

    const [rows] = await connection.query('SELECT username, email, created_at, avatar, preferences FROM users WHERE id = ?', [userId]);
    const updatedUser = rows[0];

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  upload,
};
