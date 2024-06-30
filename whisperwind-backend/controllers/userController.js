const axios = require('axios');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { getDb, ObjectId } = require('../config/db');
require('dotenv').config();

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

    const db = getDb();
    let user = await db.collection('users').findOne({ email });
    if (!user) {
      const result = await db.collection('users').insertOne({
        username: name,
        email,
        avatar: picture,
        created_at: new Date(),
      });
      user = { id: result.insertedId, username: name, email, avatar: picture };
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid Google token' });
  }
};

exports.facebookLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=name,email,picture`);
    const { name, email, picture } = response.data;

    const db = getDb();
    let user = await db.collection('users').findOne({ email });
    if (!user) {
      const result = await db.collection('users').insertOne({
        username: name,
        email,
        avatar: picture.data.url,
        created_at: new Date(),
      });
      user = { id: result.insertedId, username: name, email, avatar: picture.data.url };
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid Facebook token' });
  }
};

exports.registerUser = async (req, res) => {
  const { username, password, email, preferences } = req.body;
  const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : null;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = getDb();
    const result = await db.collection('users').insertOne({
      username,
      password: hashedPassword,
      email,
      avatar,
      preferences,
      created_at: new Date(),
    });

    const user = { id: result.insertedId, username, email, avatar, preferences };
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { username: user.username, email: user.email, created_at: new Date(), avatar, preferences } });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = getDb();
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user profile' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const { preferences } = req.body;
  const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : null;

  try {
    const db = getDb();
    const update = {
      ...(preferences && { preferences }),
      ...(avatar && { avatar })
    };
    await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: update });
    res.status(200).json({ message: 'Profile updated successfully', avatar, preferences });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};

exports.upload = upload;
