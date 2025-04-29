import Room from "../models/room.model.js";
import { errorHandler } from "../utils/error.js";

// ✅ Create a New Room
export const createRoom = async(req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a room!"));
    }

    if (!req.body.name || !req.body.type || !req.body.capacity || !req.body.resources) {
        return next(errorHandler(400, "All fields are required!"));
    }

    const newRoom = new Room({
        name: req.body.name,
        type: req.body.type,
        capacity: req.body.capacity,
        resources: req.body.resources,
        status: req.body.status || "Available",
    });

    try {
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        next(error);
    }
};

// ✅ Get All Rooms
export const getAllRooms = async(req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

// ✅ Get a Single Room by ID
export const getRoomById = async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return next(errorHandler(404, "Room not found!"));
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

// ✅ Update Room
export const updateRoom = async(req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    capacity: req.body.capacity,
                    resources: req.body.resources,
                    status: req.body.status,
                },
            }, { new: true }
        );
        if (!updatedRoom) {
            return next(errorHandler(404, "Room not found"));
        }
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
};

// DELETE room by ID (Admin only)
export const deleteRoom = async(req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            return next(errorHandler(403, "Only admins can delete rooms"));
        }

        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        next(error);
    }
};