const express = require('express');
const router = express.Router();
const userController = require('./userController');
const authMiddleware = require('./authMiddleware');
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware.authenticateToken, userController.getUserProfile);
router.put('/profile', authMiddleware.authenticateToken, userController.updateUserProfile);
router.post('/google-login', userController.googleLogin);
router.post('/facebook-login', userController.facebookLogin);
router.post('/logout', authMiddleware.authenticateToken, authMiddleware.logout);

module.exports = router;
