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
 * @desc    Any authenticated user can request a booking
 * @access  Private
 */
router.post("/create", verifyToken, createBooking);

/**
 * @route   GET /api/bookings
 * @desc    Admins get all bookings, users get only their own
 * @access  Private
 */
router.get("/", verifyToken, getBookings);

/**
 * @route   PUT /api/bookings/:bookingId
 * @desc    Only admins can update booking status
 * @access  Private (Admin only)
 */
router.put("/:bookingId", verifyToken, updateBookingStatus);

export default router;