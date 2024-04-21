export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegistrationCredentials {
    email: string;
    nom: string;
    prenom: string;
    motDePasse: string;
}

export interface AuthResponse {
    accessToken: string,
    user: User
}


export interface User {
    id: number;
    username: string;
    email: string;
    nom: string;
    prenom: string;
    role: string;
}