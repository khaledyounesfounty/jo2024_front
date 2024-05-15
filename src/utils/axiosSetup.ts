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
const publicEndpoints = [
    '/login',
    '/register',
    '/offre', // Assumes all subpaths are public
    '/events' // Assumes all subpaths are public
];

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
axiosInstance.interceptors.request.use(
    (config:any) => {
        const token = localStorage.getItem('jwtToken');
        // logs the url
        console.log("config.url : ", config.url);

        // Check if the URL is not a public endpoint
        if (!publicEndpoints.includes(config.url) && token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('Error in request interceptor:', error);
        return Promise.reject(error);
    }
);


export default axiosInstance;
