import axiosInstance from '../utils/axiosSetup';

const getEventStatistics = () => axiosInstance.get('/dashboard/eventStatistic');

export {
  getEventStatistics,
};
