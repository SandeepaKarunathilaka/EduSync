import express from "express";
import Availability from "../models/availability.model.js"; // make sure the filename matches
const router = express.Router();

// Add or Update Availability
router.post("/", async(req, res) => {
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
        console.error(error);
        res.status(400).json({ message: "Error submitting availability" });
    }
});

// Get Availability for Lecturer
router.get("/:lecturerId", async(req, res) => {
    try {
        const availability = await Availability.findOne({ lecturerId: req.params.lecturerId });
        if (!availability) {
            return res.status(404).json({ message: "Availability not found" });
        }
        res.status(200).json(availability);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error fetching availability" });
    }
});

export default router;