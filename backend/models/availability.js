const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  lecturerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer', required: true },
  availableDays: [String],  // Array of days
  availableTimes: [String], // Array of times (e.g., '9:00-10:00')
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
