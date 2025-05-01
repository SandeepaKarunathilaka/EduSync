import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { io } from "../index.js";

// Create Booking (User)
export const createBooking = async(req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const { roomId, requestedTime, endTime, reason } = req.body;
        if (!roomId || !requestedTime || !endTime || !reason) {
            return next(errorHandler(400, "All fields are required"));
        }

        const room = await Room.findById(roomId);
        if (!room) return next(errorHandler(404, "Room not found"));

        const conflict = await Booking.findOne({
            roomId,
            status: { $in: ["Pending", "Approved"] },
            requestedTime: { $lt: new Date(endTime) },
            endTime: { $gt: new Date(requestedTime) },
        });

        if (conflict) {
            const suggestions = await Room.find({
                _id: { $ne: roomId },
                type: room.type,
                capacity: { $gte: room.capacity - 10 },
                status: "Available",
            }).limit(3);

            return res.status(409).json({
                message: "This room is already booked at the selected time.",
                suggestions,
            });
        }

        const booking = new Booking({
            roomId,
            requestedTime,
            endTime,
            reason,
            userId: req.user.id,
            status: "Pending",
        });

        const saved = await booking.save();
        const populated = await saved
            .populate("roomId", "name type")
            .populate("userId", "username email");

        io.emit("newBookingRequest", {
            message: "New booking request submitted",
            booking: populated,
        });

        res.status(201).json({ message: "Booking request created", booking: populated });
    } catch (err) {
        next(errorHandler(500, "Failed to create booking"));
    }
};

// Update Booking Status (Admin)
export const updateBookingStatus = async(req, res, next) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        const booking = await Booking.findById(bookingId).populate("roomId").populate("userId");
        if (!booking) return next(errorHandler(404, "Booking not found"));

        if (status === "Approved") {
            const conflict = await Booking.findOne({
                roomId: booking.roomId._id,
                status: "Approved",
                _id: { $ne: booking._id },
                requestedTime: { $lt: booking.endTime },
                endTime: { $gt: booking.requestedTime },
            });

            if (conflict) return next(errorHandler(409, "Room already occupied during this time."));
        }

        booking.status = status;
        const updated = await booking.save();

        io.emit("bookingStatusChanged", {
            bookingId: updated._id.toString(),
            status: updated.status,
            userId: updated.userId._id.toString(),
            roomName: updated.roomId.name || "N/A",
        });

        res.status(200).json({ message: "Booking status updated", booking: updated });
    } catch (error) {
        next(errorHandler(500, "Error updating booking"));
    }
};

// Get Bookings (Admin: all, User: own)
export const getBookings = async(req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const filter = req.user.isAdmin ? {} : { userId: req.user.id };

        const bookings = await Booking.find(filter)
            .populate("roomId", "name type capacity")
            .populate("userId", "username email")
            .sort({ requestedTime: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        next(errorHandler(500, "Error fetching bookings"));
    }
};

// Delete Booking (Admin only)
export const deleteBooking = async(req, res, next) => {
    const { bookingId } = req.params;

    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        const deleted = await Booking.findByIdAndDelete(bookingId);
        if (!deleted) return next(errorHandler(404, "Booking not found"));

        res.status(200).json({ message: "Booking deleted", booking: deleted });
    } catch (error) {
        next(errorHandler(500, "Error deleting booking"));
    }
};