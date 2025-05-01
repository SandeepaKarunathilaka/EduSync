// ✅ booking.route.js - Routes for Booking Management

import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
    createBooking,
    getBookings,
    updateBookingStatus,
} from "../controllers/booking.controller.js";

const router = express.Router();

/**
 * @route   POST /api/bookings/create
 * @desc    User creates a booking request
 * @access  Private (Authenticated Users)
 */
router.post("/create", verifyToken, createBooking);

/**
 * @route   GET /api/bookings
 * @desc    Admin fetches all bookings
 * @access  Private (Admin only)
 */
router.get("/", verifyToken, getBookings);

/**
 * @route   PUT /api/bookings/:bookingId
 * @desc    Admin updates booking status (approve/reject)
 * @access  Private (Admin only)
 */
router.put("/:bookingId", verifyToken, updateBookingStatus);

export default router;