export interface Evenement {
    id: number;
    titre: string;
    dateEvent: string; 
    lieu: string;
    description: string;
    nombreDePlacesMax: number;
    nombreDePlacesDisponibles: number;
    isDisponible: boolean;
    prixUnitaire: number;
    image: string;
    categorie: string;
  }