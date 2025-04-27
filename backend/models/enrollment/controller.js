const enrollmentService = require("./service");

const createEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.createEnrollment(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEnrollmentStatus = async (req, res) => {
  try {
    const enrollment = await enrollmentService.updateEnrollmentStatus(
      req.params.id,
      req.body.status
    );
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.deleteEnrollment(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnrollmentsByStudentId = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getEnrollmentsByStudentId(
      req.params.studentId
    );
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnrollmentsByCourseId = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getEnrollmentsByCourseId(
      req.params.courseId
    );
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEnrollment,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
  getEnrollmentsByStudentId,
  getEnrollmentsByCourseId,
};
