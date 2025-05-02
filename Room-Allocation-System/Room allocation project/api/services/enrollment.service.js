import Enrollment from "../models/enrollment.model.js";

export const createEnrollment = async(enrollmentData) => {
    const enrollment = new Enrollment(enrollmentData);
    return await enrollment.save();
};

export const getEnrollmentById = async(id) => {
    return await Enrollment.findById(id).populate("course");
};

export const updateEnrollmentStatus = async(id, status) => {
    return await Enrollment.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteEnrollment = async(id) => {
    return await Enrollment.findByIdAndUpdate(
        id, { deleteStatus: true }, { new: true }
    );
};

export const getEnrollmentsByStudentId = async(studentId) => {
    return await Enrollment.find({
        student: studentId,
        deleteStatus: false,
    }).populate("course");
};

export const getEnrollmentsByCourseId = async(courseId) => {
    return await Enrollment.find({
        course: courseId,
        deleteStatus: false,
    }).populate("course");
};