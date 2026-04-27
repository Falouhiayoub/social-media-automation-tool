import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// ✅ Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Handle responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized (token expired or invalid)
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized - logging out");

      // remove token
      localStorage.removeItem("token");

      // optional: redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;