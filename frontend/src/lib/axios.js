import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:8080/api" : "/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
});

export default axiosInstance;
