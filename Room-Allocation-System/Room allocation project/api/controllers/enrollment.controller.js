import {
    createEnrollment as createService,
    getEnrollmentById as getById,
    updateEnrollmentStatus as updateStatus,
    deleteEnrollment as deleteOne,
    getEnrollmentsByStudentId as getByStudent,
    getEnrollmentsByCourseId as getByCourse,
} from "../services/enrollment.service.js";

export const createEnrollment = async(req, res) => {
    try {
        const enrollment = await createService(req.body);
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getEnrollmentById = async(req, res) => {
    try {
        const enrollment = await getById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEnrollmentStatus = async(req, res) => {
    try {
        const enrollment = await updateStatus(req.params.id, req.body.status);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEnrollment = async(req, res) => {
    try {
        const enrollment = await deleteOne(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json({ message: "Enrollment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEnrollmentsByStudentId = async(req, res) => {
    try {
        const enrollments = await getByStudent(req.params.studentId);
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEnrollmentsByCourseId = async(req, res) => {
    try {
        const enrollments = await getByCourse(req.params.courseId);
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};