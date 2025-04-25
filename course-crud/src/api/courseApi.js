import axiosInstance from "./axiosInstance";

const courseApi = {
  // Create a new course
  createCourse: async (courseData) => {
    try {
      const response = await axiosInstance.post("/courses", courseData);
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await axiosInstance.get("/courses");
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  },

  // Get a course by ID
  getCourseById: async (id) => {
    try {
      const response = await axiosInstance.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      throw error;
    }
  },

  // Update a course by ID
  updateCourse: async (id, courseData) => {
    try {
      const response = await axiosInstance.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  // Delete a course by ID (soft delete)
  deleteCourse: async (id) => {
    try {
      const response = await axiosInstance.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },
};

export default courseApi;
