// routes/api.js
const express = require('express');
const router = express.Router();
const { createAchievement, getAchievements, getAchievementById, updateAchievement, deleteAchievement } = require('../controllers/achievementController');
const upload = require('../middlewares/upload'); // Middleware for handling file uploads

// Achievement routes
router.post('/achievements', upload.single('image'), createAchievement);
router.get('/achievements', getAchievements);
router.get('/achievements/:id', getAchievementById);
router.put('/achievements/:id', upload.single('image'), updateAchievement);
router.delete('/achievements/:id', deleteAchievement);

module.exports = router;
