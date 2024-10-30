

import mongoose, {Schema, Document, model } from 'mongoose';

// Interface de base pour tous la resrvation
export interface IReservation extends Document{
    idReservation?:  mongoose.Types.ObjectId;    // ajout explicite de l'ID
    nombreDePlaces: number;
    dateReservation: Date;
    heureReservation: string;
    restaurantId: string;
    utilisateurId: string;
    commentaires: string 
    statut?: 'En attente' | 'Confirmée' | 'Annulée';  // Statut géré par le système 

} 


// Schéma de la Réservation
const ReservationSchema = new Schema({

   
    dateReservation: { type: Date, default: Date.now }, // Ex: "2024-10-09"
    nombreDePlaces: { type: Number, required: true },  // Nombre entier de places réservées
    heureReservation: { type: String, required: true }, // Heure au format "HH:MM"
    utilisateurId: { type: String, required: true }, // Référence au client (ClientUserModel)
    restaurantId: { type: String, required: true },    // Référence au 
    commentaires: {type: String, required: true},  
    statut: {type: String, required: false}
  },

  { timestamps: true },

);


  // Modèle de la Réservation


export default mongoose.model<IReservation>('Reservation', ReservationSchema);

