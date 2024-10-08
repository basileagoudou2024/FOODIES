export interface Reservation {
    reservationId: string;       // Identifiant unique de la réservation
    restaurantId: string;        // ID du restaurant pour lequel la réservation est effectuée
    clients: number;             // Nombre de clients pour la réservation
    date: string;                // Date de la réservation (au format 'YYYY-MM-DD')
    time: string;                // Heure de la réservation (au format 'HH:MM')
  }
  