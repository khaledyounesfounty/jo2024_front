import axiosInstance from "../utils/axiosSetup";

const getAllBillets = async () => {
    try {
        const response = await axiosInstance.get("/billets");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {getAllBillets};