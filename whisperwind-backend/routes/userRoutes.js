const express = require('express');
const { registerUser, loginUser, googleLogin, getUserProfile, updateUserProfile, getAllUsers, updateUserAdmin, deleteUserAdmin, upload } = require('../controllers/userController');
const { authenticateToken, logout } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.get('/me', authenticateToken, getUserProfile);
router.post('/logout', authenticateToken, logout);
router.put('/me', authenticateToken, upload.single('avatar'), updateUserProfile);

router.get('/admin/users', authenticateToken, getAllUsers);
router.put('/admin/users/:id', authenticateToken, upload.single('avatar'), updateUserAdmin);
router.delete('/admin/users/:id', authenticateToken, deleteUserAdmin);

module.exports = router;
