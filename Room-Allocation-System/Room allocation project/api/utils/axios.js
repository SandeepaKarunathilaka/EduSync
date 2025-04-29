import axios from "axios";

axios.defaults.withCredentials = true; // ✅ Send cookies by default
axios.defaults.baseURL = "http://localhost:3000"; // Optional: API base URL

export default axios;