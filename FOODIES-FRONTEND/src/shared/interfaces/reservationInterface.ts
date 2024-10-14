import { DateTimeFormatResult } from "vue-i18n";

export interface Reservation { 
    idReservation?: string;           // Identifiant unique de la réservation attribué par la base de données (mongoDB), typiquement une chaîne de caractères
    dateReservation: string;            // Date de la réservation sous forme d'objet Date (permet de stocker année/mois/jour)
    nombreDePlaces: number;           // Nombre de places réservées (nombre entier)
    heureReservation: string;         // Heure de la réservation (sous forme de chaîne de caractères pour simplifier, par ex : "19:30")
    idUtilisateur: string ;           // Identifiant unique de l'utilisateur attribué par la base de données (mongoDB)
    idRestaurant: string ;
    commentaires: string            // Identifiant unique du restaurant attribué par la base de données (mongoDB)
  }
  