const axios = require('axios');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const connection = require('../config/db');
const bcrypt = require('bcrypt');
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

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();

    let [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    let user = rows[0];
    if (!user) {
      const query = 'INSERT INTO users (username, email, avatar, created_at) VALUES (?, ?, ?, NOW())';
      const [result] = await connection.query(query, [name, email, picture]);
      user = { id: result.insertId, username: name, email, avatar: picture };
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: accessToken });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};

exports.facebookLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=name,email,picture`);
    const { name, email, picture } = response.data;

    let [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    let user = rows[0];
    if (!user) {
      const query = 'INSERT INTO users (username, email, avatar, created_at) VALUES (?, ?, ?, NOW())';
      const [result] = await connection.query(query, [name, email, picture.data.url]);
      user = { id: result.insertId, username: name, email, avatar: picture.data.url };
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: accessToken });
  } catch (error) {
    console.error('Error verifying Facebook token:', error);
    res.status(401).json({ message: 'Invalid Facebook token' });
  }
};

exports.registerUser = async (req, res) => {
  const { username, password, email, preferences } = req.body;
  const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : null;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, email, created_at, avatar, preferences) VALUES (?, ?, ?, NOW(), ?, ?)';
    const [result] = await connection.query(query, [username, hashedPassword, email, avatar, preferences]);

    const user = { id: result.insertId, username, email, avatar, preferences };
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('User registered:', user);
    res.status(200).json({ token, user: { username: user.username, email: user.email, created_at: new Date(), avatar, preferences } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

exports.loginUser = async (req, res) => {
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
    console.log('User logged in:', user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Fetching profile for user ID:", userId);
    const [rows] = await connection.query('SELECT username, email, created_at, avatar, preferences FROM users WHERE id = ?', [userId]);
    const user = rows[0];
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("User profile found:", user);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const { preferences } = req.body;
  const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : null;

  try {
    const query = 'UPDATE users SET preferences = ?, avatar = ? WHERE id = ?';
    await connection.query(query, [preferences, avatar, userId]);
    res.status(200).json({ message: 'Profile updated successfully', avatar, preferences });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};

exports.upload = upload;
