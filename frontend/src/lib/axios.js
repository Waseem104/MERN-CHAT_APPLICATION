import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

// response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
