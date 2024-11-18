
export type UserType = 'client' | 'owner' | 'admin';

export interface User {
    email: string;
    password: string;
    typeDeCompte: UserType; 
    userId? :string;
    nom?: string;
    prenom?: string;
    adresse?: string;
    telephone?: string;
    cuisine?: string;
    image?: string;
    points?: number;
    heuresOuverture?: string;
    createdAt?: Date | string;
    confirmationCode?: number;
    isConfirmed?: boolean;
    confirmationCodeExpiration?: Date;
    restaurantsUtilises?: string[];
    listeDesReservations?: string[];
    langueParlee?: string;
    restaurantsDetenus?: string[];
  }