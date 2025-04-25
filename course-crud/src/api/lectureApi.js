import axiosInstance from "./axiosInstance";

const lectureApi = {
  // Create a new lecture
  createLecture: async (lectureData) => {
    try {
      const response = await axiosInstance.post("/lectures", lectureData);
      return response.data;
    } catch (error) {
      console.error("Error creating lecture:", error);
      throw error;
    }
  },

  // Get all lectures for a chapter
  getLecturesByChapterId: async (chapterId) => {
    try {
      const response = await axiosInstance.get(
        `/lectures?chapter=${chapterId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching lectures:", error);
      throw error;
    }
  },

  // Get a lecture by ID
  getLectureById: async (id) => {
    try {
      const response = await axiosInstance.get(`/lectures/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lecture by ID:", error);
      throw error;
    }
  },

  // Update a lecture by ID
  updateLecture: async (id, lectureData) => {
    try {
      const response = await axiosInstance.put(`/lectures/${id}`, lectureData);
      return response.data;
    } catch (error) {
      console.error("Error updating lecture:", error);
      throw error;
    }
  },

  // Delete a lecture by ID (soft delete)
  deleteLecture: async (id) => {
    try {
      const response = await axiosInstance.delete(`/lectures/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting lecture:", error);
      throw error;
    }
  },
};

export default lectureApi;
