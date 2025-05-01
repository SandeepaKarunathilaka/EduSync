import axiosInstance from "./axiosInstance";

const enrollmentApi = {
    // Create a new enrollment
    createEnrollment: async(enrollmentData) => {
        try {
            const response = await axiosInstance.post("/enrollments", enrollmentData);
            return response.data;
        } catch (error) {
            console.error("Error creating enrollment:", error);
            throw error;
        }
    },

    // Get enrollment by ID
    getEnrollmentById: async(id) => {
        try {
            const response = await axiosInstance.get(`/enrollments/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching enrollment:", error);
            throw error;
        }
    },

    // Update enrollment status
    updateEnrollmentStatus: async(id, status) => {
        try {
            const response = await axiosInstance.put(`/enrollments/${id}/status`, {
                status,
            });
            return response.data;
        } catch (error) {
            console.error("Error updating enrollment status:", error);
            throw error;
        }
    },

    // Delete enrollment
    deleteEnrollment: async(id) => {
        try {
            const response = await axiosInstance.delete(`/enrollments/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting enrollment:", error);
            throw error;
        }
    },

    // Get enrollments by student ID
    getEnrollmentsByStudentId: async(studentId) => {
        try {
            const response = await axiosInstance.get(
                `/enrollments/student/${studentId}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching enrollments by student ID:", error);
            throw error;
        }
    },

    // Get enrollments by course ID
    getEnrollments: async() => {
        try {
            const response = await axiosInstance.get(`/enrollments/course/122}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching enrollments by course ID:", error);
            throw error;
        }
    },
};

export default enrollmentApi;