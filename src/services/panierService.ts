import axiosInstance from "../utils/axiosSetup";

const getPanierDetails = () => axiosInstance.get('/paniers/details');

const validerPanier = async () => {
    try {
        await axiosInstance.post("/paniers/valider");
    } catch (error) {
        throw error;
    }
}

export {getPanierDetails , validerPanier};