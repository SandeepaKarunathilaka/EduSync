import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

// ✅ Create a new room (Admin only)
router.post("/create", verifyToken, createRoom);

// ✅ Get all rooms (Public)
router.get("/getrooms", getAllRooms);

// ✅ Get a single room by ID (Public)
router.get("/getroom/:roomId", getRoomById);

// ✅ Update room details (Admin only)
router.put("/updateroom/:id", verifyToken, updateRoom);
router.delete("/deleteroom/:id", verifyToken, deleteRoom);

export default router;