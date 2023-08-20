const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const upload = require('./middlewares/upload'); // Middleware for handling file uploads

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://127.0.0.1/student-achievement-db'; // Replace with your MongoDB connection URI

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

app.use('/api', apiRoutes);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});
