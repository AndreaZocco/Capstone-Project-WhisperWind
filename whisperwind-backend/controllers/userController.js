const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const multer = require('multer');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const UserModel = require('../models/userModel');

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
    res.status(200).json({ token, user });
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
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

const googleLogin = async (req, res) => {
  try {
    await connection.query('SELECT 1');
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, name, email, picture } = ticket.getPayload();

    UserModel.findUserByExternalId(sub, 'GOOGLE', async (err, user) => {
      if (err) {
        console.error('Error finding user by external ID:', err);
        return res.status(500).json({ error: 'An error occurred while logging in with Google' });
      }

      if (!user) {
        UserModel.createUser({ 
          username: name, 
          password: null, 
          email, 
          external_id: sub, 
          external_type: 'GOOGLE' 
        }, (err, result) => {
          if (err) {
            console.error('Detailed error creating user:', err);
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({ error: 'User already exists' });
            }
            return res.status(500).json({ error: 'Error creating user in database' });
          }

          const jwtToken = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
          console.log('New user logged in with Google successfully:', email);
          return res.status(200).json({ token: jwtToken });
        });
      } else {
        const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Existing user logged in with Google successfully:', email);
        return res.status(200).json({ token: jwtToken });
      }
    });
  } catch (error) {
    console.error('Unhandled error during Google login:', error);
    res.status(500).json({ error: 'An unexpected error occurred during Google login' });
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

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT id, username, email, created_at, avatar, preferences FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching the users' });
  }
};

const updateUserAdmin = async (req, res) => {
  const userId = req.params.id;
  const { username, email, preferences } = req.body;
  const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : null;

  try {
    const query = avatar ?
      'UPDATE users SET username = ?, email = ?, preferences = ?, avatar = ? WHERE id = ?' :
      'UPDATE users SET username = ?, email = ?, preferences = ? WHERE id = ?';
    
    const params = avatar ? [username, email, preferences, avatar, userId] : [username, email, preferences, userId];

    await connection.query(query, params);

    const [rows] = await connection.query('SELECT id, username, email, created_at, avatar, preferences FROM users WHERE id = ?', [userId]);
    const updatedUser = rows[0];

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

const deleteUserAdmin = async (req, res) => {
  const userId = req.params.id;
  try {
    await connection.query('DELETE FROM users WHERE id = ?', [userId]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserAdmin,
  deleteUserAdmin,
  upload,
};
