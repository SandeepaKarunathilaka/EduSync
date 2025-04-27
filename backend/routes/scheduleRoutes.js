const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// Create new schedule
router.post('/', async (req, res) => {
  try {
    const schedule = new Schedule({
      lecturer: req.body.lecturer,
      course: req.body.course,
      timeSlot: req.body.timeSlot,
      notes: req.body.notes
    });

    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all schedules with populated data
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('lecturer', 'name expertise')
      .populate('course', 'name code');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;