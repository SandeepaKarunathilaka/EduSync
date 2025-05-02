import express from 'express';
import Schedule from '../models/schedule.model.js'; // make sure the file name matches

const router = express.Router();

// Create new schedule
router.post('/', async(req, res) => {
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
router.get('/', async(req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('lecturer', 'name expertise')
            .populate('course', 'title'); // use 'title' if your Course model has no 'name' or 'code'
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;