const express = require('express');
const { addTrackToCategoryPage, getAllTracks } = require('../controllers/trackController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add-to-category', authenticateToken, addTrackToCategoryPage);
router.get('/', authenticateToken, getAllTracks);

module.exports = router;
