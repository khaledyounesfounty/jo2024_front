import axios from "axios";

// Ajout du token dans le header de chaque requête
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Redirection vers la page de connexion si le token est invalide
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// create an axios instance avec une base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default axiosInstance;
