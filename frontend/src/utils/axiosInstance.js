import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server Error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status } = error.response;

//       if (status === 401) {
//         console.warn("Unauthorized! Redirecting to login...");
//         window.location.href = "/login"; // Consider using useNavigate in React
//       } else if (status === 500) {
//         console.error("Server Error. Please try again later.");
//       }
//     } else if (error.code === "ECONNABORTED") {
//       console.error("Request timeout. Please try again.");
//     } else {
//       console.error("Network Error. Please check your connection.");
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
