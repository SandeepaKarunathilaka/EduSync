

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import route modules
const lecturerRoutes = require('./routes/lecturerRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');

const app = express();
const PORT = process.env.PORT || 5000;  // Port number (either from environment variable or default to 5000)

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming JSON data

// Use routes
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/availability', availabilityRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)  // MongoDB URI from .env
  .then(() => console.log('MongoDB connected'))  // Success message
  .catch((err) => console.error('MongoDB connection error:', err));  // Error message

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
