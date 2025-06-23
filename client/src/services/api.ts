import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can customize error handling here, e.g., logging, notifications
    console.error("API error:", error.response || error.message || error);
    return Promise.reject(error);
  }
);

export default api;
