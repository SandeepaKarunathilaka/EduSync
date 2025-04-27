const express = require('express');
const router = express.Router();
const Lecturer = require('../models/lecturer');

// Get all lecturers
router.get('/', async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    res.json(lecturers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create lecturer
router.post('/', async (req, res) => {
  const lecturer = new Lecturer({
    name: req.body.name,
    expertise: req.body.expertise,
    availability: req.body.availability
  });

  try {
    const newLecturer = await lecturer.save();
    res.status(201).json(newLecturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update lecturer
router.put('/:id', async (req, res) => {
  try {
    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLecturer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete lecturer
router.delete('/:id', async (req, res) => {
  try {
    await Lecturer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lecturer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;