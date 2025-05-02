import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Core app routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.route.js";

// Course Management routes
import courseRoutes from "./routes/course.route.js";
import chapterRoutes from "./routes/chapter.route.js";
import lectureRoutes from "./routes/lecture.route.js";
import enrollmentRoutes from "./routes/enrollment.route.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "dist")));

// MongoDB Connection (use existing env config)
mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// App Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// Course Management Routes (merged)
app.use("/api/courses", courseRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// WebSocket Real-Time Dashboard Data
let totalUsers = 7;
let totalRooms = 10;
let bookedRooms = 4;
let availableRooms = totalRooms - bookedRooms;
let pendingRequests = 3;

let todaySchedule = [
    { room: "A101", class: "Physics", time: "10:00 AM" },
    { room: "B201", class: "Math", time: "11:30 AM" },
];

let upcomingReservations = [
    { room: "C301", time: "2:00 PM" },
    { room: "D401", time: "3:30 PM" },
];

let classSchedule = [{
        room: "A501",
        timeslots: [
            { time: "8AM", status: "Approved" },
            { time: "9AM", status: "Reserved" },
        ],
    },
    {
        room: "B502",
        timeslots: [
            { time: "8AM", status: "Pending" },
            { time: "10AM", status: "Approved" },
        ],
    },
];

io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    socket.emit("academicDashboardData", {
        totalUsers,
        totalRooms,
        bookedRooms,
        availableRooms,
        pendingRequests,
        todaySchedule,
        upcomingReservations,
    });

    socket.emit("classScheduleUpdate", classSchedule);

    const intervalId = setInterval(() => {
        bookedRooms = Math.floor(Math.random() * totalRooms);
        availableRooms = totalRooms - bookedRooms;
        pendingRequests = Math.floor(Math.random() * 5);

        io.emit("academicDashboardData", {
            totalUsers,
            totalRooms,
            bookedRooms,
            availableRooms,
            pendingRequests,
            todaySchedule,
            upcomingReservations,
        });
    }, 10000);

    socket.on("addClass", (newClass) => {
        const { room, time, status } = newClass;
        const existing = classSchedule.find((r) => r.room === room);

        if (existing) {
            existing.timeslots.push({ time, status });
        } else {
            classSchedule.push({ room, timeslots: [{ time, status }] });
        }

        io.emit("classScheduleUpdate", classSchedule);
    });

    socket.on("disconnect", () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
        clearInterval(intervalId);
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message, statusCode });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Export socket.io instance
export { io };