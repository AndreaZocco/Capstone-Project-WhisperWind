// whisperwind-backend/models/userModel.js
const { getDb, ObjectId } = require('./db');

const userSchema = {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  preferences: { type: Object },
  created_at: { type: Date, default: Date.now },
};

const getUserCollection = () => {
  const db = getDb();
  return db.collection('users');
};

module.exports = {
  userSchema,
  getUserCollection
};
