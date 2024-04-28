import axiosInstance from "../utils/axiosSetup";


const getPanierDetails = async () => {
    try {
        const response = await axiosInstance.get("/paniers/details");
        return response.data;
    } catch (error) {
        throw error;
    }
}

const validerPanier = async () => {
    try {
        await axiosInstance.post("/paniers/valider");
    } catch (error) {
        throw error;
    }
}

export {getPanierDetails , validerPanier};