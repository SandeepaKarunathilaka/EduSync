import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your backend URL

// Get all lecturers
export const getLecturers = async () => {
  try {
    const response = await axios.get(`${API_URL}/lecturers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lecturers", error);
  }
};

// Get all schedules
export const getSchedules = async () => {
  try {
    const response = await axios.get(`${API_URL}/schedules`);
    return response.data;
  } catch (error) {
    console.error("Error fetching schedules", error);
  }
};

// Add a new lecturer
export const addLecturer = async (lecturerData) => {
  try {
    const response = await axios.post(`${API_URL}/lecturers`, lecturerData);
    return response.data;
  } catch (error) {
    console.error("Error adding lecturer", error);
  }
};

// Add a new schedule
export const addSchedule = async (scheduleData) => {
  try {
    const response = await axios.post(`${API_URL}/schedules`, scheduleData);
    return response.data;
  } catch (error) {
    console.error("Error adding schedule", error);
  }
};
