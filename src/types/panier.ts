export interface PanierDto {
    id: number;
    sommeTotal: number;
    reservations: ReservationDto[];
}

export interface ReservationDto {
    id: number;
    idOffre: OffreDto1;
    idEvent: EventDto1;
    prix: number;
}

export interface OffreDto1 {
    description: string;
    titre: string;
}

export interface EventDto1 {
    titre: string;
    dateEvent: string; // or Date if you prefer working with Date objects
    lieu: string;
    description: string;
    nombreDePlacesMax: number;
    categorie: string;
}
