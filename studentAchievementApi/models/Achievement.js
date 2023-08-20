// models/Achievement.js
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  studentName: String, 
  studentId: mongoose.Schema.Types.ObjectId, 
  category: String,
  title: String,
  dateOfAchievement: Date,
  givenBy: String,
  dateOfPosting: Date,
  briefDescription: String,
  imageUrl: String,
  linkToWebsite: String,
});

module.exports = mongoose.model('Achievement', achievementSchema);
