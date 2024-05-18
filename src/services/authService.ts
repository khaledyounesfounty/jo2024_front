import axios from 'axios';
import {LoginCredentials, AuthResponse, RegistrationCredentials} from '../types/authTypes';


const API_URL = 'http://13.37.105.219:8080/api/v1';


export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
        // log the response to the console
        console.log('Login response:', response);
        const token = response.data.accessToken;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // log the user to the console
        console.log('Logged in user:', response.data.user);

        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};


export const register = async (credentials: RegistrationCredentials): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/register`, {
            email: credentials.email,
            nom: credentials.nom,
            prenom: credentials.prenom,
            motDePasse: credentials.motDePasse,
        });
        console.log('Registration response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Creation du compte a echoue:', error);
        throw error;
    }
};


