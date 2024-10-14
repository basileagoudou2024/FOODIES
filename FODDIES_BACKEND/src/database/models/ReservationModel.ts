

import mongoose, {Schema, Document, model } from 'mongoose';

// Interface de base pour tous la resrvation
export interface IReservation extends Document{
    idReservation?: string;     // ajout explicite de l'ID
    nombreDePlaces: number;
    dateReservation: string;
    heureReservation: string;
    idRestaurant: string;
    idUtilisateur: string;
    commentaires: string  

} 


// Schéma de la Réservation
const ReservationSchema = new Schema({

    idReservation: { type: String, required: false }, // Identifiant optionnel, géré automatiquement par MongoDB
    dateReservation: { type: String, required: true }, // Ex: "2024-10-09"
    nombreDePlaces: { type: Number, required: true },  // Nombre entier de places réservées
    heureReservation: { type: String, required: true }, // Heure au format "HH:MM"
    idUtilisateur: { type: String, required: true }, // Référence au client (ClientUserModel)
    idRestaurant: { type: String, required: true },    // Référence au 
    commentaires: {type: String, required: true}  
  },

  { timestamps: true },

);


  // Modèle de la Réservation


export default mongoose.model<IReservation>('Reservation', ReservationSchema);

