import axiosInstance from '../utils/axiosSetup';

const getEvents = () => axiosInstance.get('/events');
const getEventById = (id: string) => axiosInstance.get(`/events/${id}`);
const createEvent = (eventData: any) => axiosInstance.post('/events', eventData);
const updateEvent = (id: string, eventData: any) => axiosInstance.put(`/events/${id}`, eventData);
const deleteEvent = (id: string) => axiosInstance.delete(`/events/${id}`);
const getEventsByCategory = (category: string) => axiosInstance.get(`/events/search/category/${category}`);
const getEventsByCriteria = (criteria: string) => axiosInstance.get(`/events/search/criteria/${criteria}`);
const getOffresByEventId = (id: string) => axiosInstance.get(`/events/${id}/offres`);

export {
  getEvents,
  getOffresByEventId, 
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByCategory,
  getEventsByCriteria
};
