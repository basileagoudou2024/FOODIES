



export interface Reservation {
  _id?: string;
  restaurantId: string;
  utilisateurId: string;
  dateReservation: Date | string;
  heureReservation: string;
  nombreDePlaces: number;
  commentaires: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  __v?: number;
  hasBeenEvaluated?: boolean;
}

  