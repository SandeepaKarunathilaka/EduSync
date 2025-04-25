const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const courseRoutes = require("./modules/course/route");
const chapterRoutes = require("./modules/chapter/route");
const lectureRoutes = require("./modules/lecture/route");
const enrollmentRoutes = require("./modules/enrollment/route");
const app = express();
const PORT = 5001;
const MONGO_URI = "mongodb+srv://shekya123madubha:u220vrsMzi2UMiMO@cluster0.9qqy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/enrollments", enrollmentRoutes);
// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
