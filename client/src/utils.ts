import axios from "axios";

/**
 * Get the auth token from localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * Axios instance with auth headers pre-configured
 */
export const axiosAuth = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach Authorization header if token exists
axiosAuth.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Handle Axios errors cleanly
 */
export const handleAxiosError = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || "Server error occurred";
  }
  return "Unexpected error occurred";
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
