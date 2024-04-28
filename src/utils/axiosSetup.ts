import axios from "axios";

// Ajout du token dans le header de chaque requête


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

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    console.log('Token from localStorage:', token);  // Debug: Log token value
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log('Headers after adding token:', config.headers);  // Debug: Log headers
    }
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);


export default axiosInstance;
