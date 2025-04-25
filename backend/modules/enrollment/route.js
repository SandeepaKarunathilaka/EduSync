const express = require("express");
const enrollmentController = require("./controller");

const router = express.Router();

router.post("/", enrollmentController.createEnrollment);
router.get("/:id", enrollmentController.getEnrollmentById);
router.put("/:id/status", enrollmentController.updateEnrollmentStatus);
router.delete("/:id", enrollmentController.deleteEnrollment);
router.get(
  "/student/:studentId",
  enrollmentController.getEnrollmentsByStudentId
);
router.get("/course/:courseId", enrollmentController.getEnrollmentsByCourseId);

module.exports = router;
