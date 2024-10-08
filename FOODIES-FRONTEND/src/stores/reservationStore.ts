import { defineStore } from 'pinia';
import {Reservation} from '../shared/interfaces/reservationInterface';

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    reservations: [] as Reservation[],
  }),
  actions: {
    bookReservation(reservation: Reservation) {
      this.reservations.push(reservation);
      console.log('Nouvelle réservation:', reservation);
    },
  },
});
