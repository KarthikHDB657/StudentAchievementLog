const Achievement = require('../models/Achievement');
const path = require('path');
const fs = require('fs');
const createAchievement = async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      category,
      title,
      dateOfAchievement,
      givenBy,
      dateOfPosting,
      briefDescription,
      linkToWebsite,
    } = req.body;

    const imageUrl = req.file ? req.file.path : '';

    const newAchievement = new Achievement({
      studentName,
      studentId,
      category,
      title,
      dateOfAchievement,
      givenBy,
      dateOfPosting,
      briefDescription,
      imageUrl,
      linkToWebsite,
    });

    const savedAchievement = await newAchievement.save();

    res.status(201).json({ ...savedAchievement._doc, imageUrl }); // Include imageUrl in the response
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the achievement.' });
  }
};
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ _id: -1 }); // Sort achievements in descending order by _id
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching achievements.' });
  }
};

const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found.' });
    }
    res.status(200).json(achievement);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the achievement.' });
  }
};

const updateAchievement = async (req, res) => {
  try {
    const {
      studentName,
      category,
      title,
      dateOfAchievement,
      givenBy,
      dateOfPosting,
      briefDescription,
      linkToWebsite,
    } = req.body;

    const imageUrl = req.file ? req.file.path : '';

    const updatedAchievement = {
      studentName,
      category,
      title,
      dateOfAchievement,
      givenBy,
      dateOfPosting,
      briefDescription,
      imageUrl,
      linkToWebsite,
    };

    const achievement = await Achievement.findByIdAndUpdate(req.params.id, updatedAchievement, {
      new: true,
    });

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found.' });
    }

    res.status(200).json(achievement);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the achievement.' });
  }
};

const deleteAchievement = async (req, res) => {
  try {
    const achievementId = req.params.id;

    // Fetch achievement from the database and get the imageUrl
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    // Delete image from filesystem using path to get the absolute path
    const imagePath = path.join(__dirname, '..', achievement.imageUrl);
    fs.unlinkSync(imagePath);

    // Delete achievement from the database
    await Achievement.findByIdAndDelete(achievementId);

    res.status(204).end(); // Successful deletion, no content
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export your controller functions
module.exports = {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
};
