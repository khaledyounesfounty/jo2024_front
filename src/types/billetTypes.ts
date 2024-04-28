// src/types/billetTypes.ts

import { Evenement } from "./eventTypes";
import Offre from "./offre.model";

export interface BilletDto {
    reservation: ReservationDto;
    idUtilisateur: UtilisateurDto;
    qrcode: QrcodeDto;
}

export interface ReservationDto {
    id: number;
    idOffre: Offre;
    idEvent: Evenement;
    prix: number;
}


export interface UtilisateurDto {
    utilisateurprincipal: UtilisateurprincipalDto;
}

export interface UtilisateurprincipalDto {
    nom: string;
    prenom: string;
}

export interface QrcodeDto {
    qrImage: string;
}
