import axiosInstance from '../utils/axiosSetup';

const getOffres = () => axiosInstance.get('/offres');
const getOffreByIdEvent = (id: string) => axiosInstance.get(`/offres/${id}`);
export {
    getOffres,
    getOffreByIdEvent
};
