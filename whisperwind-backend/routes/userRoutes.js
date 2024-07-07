const express = require('express');
const { registerUser, loginUser, googleLogin, getUserProfile, updateUserProfile, upload } = require('../controllers/userController');
const { authenticateToken, logout } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin); // Aggiungi la nuova rotta per il login Google
router.get('/me', authenticateToken, getUserProfile);
router.post('/logout', authenticateToken, logout);
router.put('/me', authenticateToken, upload.single('avatar'), updateUserProfile);

module.exports = router;
