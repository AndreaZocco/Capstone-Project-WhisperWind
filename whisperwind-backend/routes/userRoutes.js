const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/register', upload.single('avatar'), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware.authenticateToken, userController.getUserProfile);
router.put('/profile', authMiddleware.authenticateToken, upload.single('avatar'), userController.updateUserProfile);
router.post('/google-login', userController.googleLogin);
router.post('/facebook-login', userController.facebookLogin);
router.post('/logout', authMiddleware.authenticateToken, authMiddleware.logout);

module.exports = router;
