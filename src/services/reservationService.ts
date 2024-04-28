import saveReservation from "../types/reservationModel";
import axiosInstance from "../utils/axiosSetup";

const createReservation = async (data:saveReservation) => {
  try {
    const response = await axiosInstance.post('/reservation', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export {
  createReservation
}