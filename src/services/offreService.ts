// src/services/offreService.ts
import Offre from '../types/offre.model';
import axiosInstance from '../utils/axiosSetup';

const getOffres = () => axiosInstance.get<Offre[]>('/offres');
const getOffreById = (id: string) => axiosInstance.get<Offre>(`/offres/${id}`);
const createOffre = (offreData: Offre) => axiosInstance.post('/offres', offreData);
const updateOffre = (id: number, offreData: Offre) => axiosInstance.put(`/offres/${id}`, offreData);
const deleteOffre = (id: number) => axiosInstance.delete(`/offres/${id}`);
const getOffreByIdEvent = (id: string) => axiosInstance.get(`/offres/${id}`);

export {
  getOffres,
  getOffreById,
  createOffre,
  updateOffre,
  deleteOffre,
  getOffreByIdEvent
};
