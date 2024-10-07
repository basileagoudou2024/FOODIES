
import {UserType} from '../enum/userTypeEnum';
import  type {Adress} from '../interfaces/adresseInterface';

export interface IUser {
    _id?: string; // ou mongoose.Types.ObjectId si nécessaire
    nom: string;
    prenom: string;
    email: string;
    password: string;
    typeDeCompte: UserType;
    adresse: Adress;
    langueParlee?: string; // optionnel pour certains types d'utilisateur
    dateInscription?: Date; // optionnel, attribuée par Mongoose
    restaurantsUtilises?: string[]; // ou mongoose.Types.ObjectId[]
    listeDesReservations?: string[]; // optionnel
    restaurantsDetenus?: string[];
    servicePremium?: boolean; // Optionnel car peut ne pas être activé pour tous les propriétaires
    forfait?: string; // Optionnel, seulement si servicePremium est activé
    dateDebutForfait?: Date; // Optionnel, seulement si servicePremium est activé
    dateFinForfait?: Date; // Optionnel, seulement si servicePremium est activé
  }
  