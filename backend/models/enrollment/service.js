const Enrollment = require("./model");

const createEnrollment = async (enrollmentData) => {
  const enrollment = new Enrollment(enrollmentData);
  return await enrollment.save();
};

const getEnrollmentById = async (id) => {
  return await Enrollment.findById(id).populate("course student");
};

const updateEnrollmentStatus = async (id, status) => {
  return await Enrollment.findByIdAndUpdate(id, { status }, { new: true });
};

const deleteEnrollment = async (id) => {
  return await Enrollment.findByIdAndUpdate(
    id,
    { deleteStatus: true },
    { new: true }
  );
};

const getEnrollmentsByStudentId = async (studentId) => {
  return await Enrollment.find({
    student: studentId,
    deleteStatus: false,
  }).populate("course");
};

const getEnrollmentsByCourseId = async (courseId) => {
  return await Enrollment.find({
    deleteStatus: false,
  }).populate("course");
};

module.exports = {
  createEnrollment,
  getEnrollmentById,
  updateEnrollmentStatus,
  deleteEnrollment,
  getEnrollmentsByStudentId,
  getEnrollmentsByCourseId,
};
