const Achievement = require('../models/Achievement');

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
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found.' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the achievement.' });
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
