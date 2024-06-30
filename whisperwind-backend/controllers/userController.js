const axios = require('axios');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
  db = client.db();
});

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

    let user = await db.collection('users').findOne({ email });
    if (!user) {
      const result = await db.collection('users').insertOne({
        username: name,
        email: email,
        avatar: picture,
        created_at: new Date(),
      });
      user = { id: result.insertedId, username: name, email, avatar: picture };
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

    let user = await db.collection('users').findOne({ email });
    if (!user) {
      const result = await db.collection('users').insertOne({
        username: name,
        email: email,
        avatar: picture.data.url,
        created_at: new Date(),
      });
      user = { id: result.insertedId, username: name, email, avatar: picture.data.url };
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
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
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
    const update = {
      ...(preferences && { preferences }),
      ...(avatar && { avatar })
    };
    await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: update });
    res.status(200).json({ message: 'Profile updated successfully', avatar, preferences });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};

exports.upload = upload;
