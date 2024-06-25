const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, upload } = require('../controllers/userController');
const { authenticateToken, logout } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/me', authenticateToken, getUserProfile);
router.post('/logout', authenticateToken, logout);
router.post('/me', authenticateToken, upload.single('avatar'), updateUserProfile);

module.exports = router;
