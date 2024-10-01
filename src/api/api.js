import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://goit-fs17-react-node-final-project-backend.vercel.app/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
