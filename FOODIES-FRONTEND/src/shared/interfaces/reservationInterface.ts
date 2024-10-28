import { DateTimeFormatResult } from "vue-i18n";

export interface Reservation { 
    id?: string;           // Identifiant unique de la réservation attribué par la base de données (mongoDB), typiquement une chaîne de caractères
    dateReservation: DateTimeFormatResult;             // Date de la réservation sous forme d'objet Date (permet de stocker année/mois/jour)
    nombreDePlaces: number;           // Nombre de places réservées (nombre entier)
    heureReservation: string;         // Heure de la réservation (sous forme de chaîne de caractères pour simplifier, par ex : "19:30")
    utilisateurId: string ;           // Identifiant unique de l'utilisateur attribué par la base de données (mongoDB)
    restaurantId: string ;
    commentaires: string            // Identifiant unique du restaurant attribué par la base de données (mongoDB)
  }
  