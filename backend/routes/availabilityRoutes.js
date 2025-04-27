const express = require('express');
const Availability = require('../models/availability');
const router = express.Router();

// Add or Update Availability
router.post('/', async (req, res) => {
  const { lecturerId, availableDays, availableTimes } = req.body;
  try {
    const newAvailability = new Availability({
      lecturerId,
      availableDays,
      availableTimes,
    });
    await newAvailability.save();
    res.status(201).json(newAvailability);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting availability' });
  }
});

// Get Availability for Lecturer
router.get('/:lecturerId', async (req, res) => {
  try {
    const availability = await Availability.findOne({ lecturerId: req.params.lecturerId });
    res.status(200).json(availability);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching availability' });
  }
});

module.exports = router;
