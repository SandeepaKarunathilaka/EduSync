import express from "express";
import {
    createEnrollment,
    getEnrollmentById,
    updateEnrollmentStatus,
    deleteEnrollment,
    getEnrollmentsByStudentId,
    getEnrollmentsByCourseId,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

router.post("/", createEnrollment);
router.get("/:id", getEnrollmentById);
router.put("/:id/status", updateEnrollmentStatus);
router.delete("/:id", deleteEnrollment);
router.get("/student/:studentId", getEnrollmentsByStudentId);
router.get("/course/:courseId", getEnrollmentsByCourseId);

export default router;