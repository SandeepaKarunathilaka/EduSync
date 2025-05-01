import axiosInstance from "./axiosInstance";

const chapterApi = {
    // Create a new chapter
    createChapter: async(chapterData) => {
        try {
            const response = await axiosInstance.post("/chapters", chapterData);
            return response.data;
        } catch (error) {
            console.error("Error creating chapter:", error);
            throw error;
        }
    },

    // Get chapter by ID
    getChapterById: async(id) => {
        try {
            const response = await axiosInstance.get(`/chapters/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching chapter:", error);
            throw error;
        }
    },

    // Update chapter
    updateChapter: async(id, chapterData) => {
        try {
            const response = await axiosInstance.put(`/chapters/${id}`, chapterData);
            return response.data;
        } catch (error) {
            console.error("Error updating chapter:", error);
            throw error;
        }
    },

    // Delete chapter
    deleteChapter: async(id) => {
        try {
            const response = await axiosInstance.delete(`/chapters/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting chapter:", error);
            throw error;
        }
    },

    // Get chapters by course ID
    getChaptersByCourseId: async(courseId) => {
        try {
            const response = await axiosInstance.get(`/chapters/course/${courseId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching chapters by course ID:", error);
            throw error;
        }
    },
};

export default chapterApi;