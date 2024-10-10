import { Model } from 'mongoose';
import { IReservation } from '../models/ReservationModel'; // Importation de l'interface de la réservation
import Reservation from '../models/ReservationModel'; // Importation du modèle Mongoose

// Fonction pour ajouter (créer) une nouvelle réservation
export const addReservation = async (reservationData: Partial<IReservation>) => {
  try {
    const newReservation = new Reservation(reservationData);
    await newReservation.save();
    return newReservation;
  } catch (error: any) {
    throw new Error(`Erreur lors de l'ajout de la réservation : ${error.message}`);
  }
};

// Fonction pour annuler (supprimer) une réservation par son ID
export const cancelReservation = async (idReservation: string) => {
  try {
    const result = await Reservation.findByIdAndDelete(idReservation);
    if (!result) {
      throw new Error('Réservation non trouvée ou déjà supprimée');
    }
    return `Réservation avec ID ${idReservation} annulée avec succès`;
  } catch (error: any) {
    throw new Error(`Erreur lors de l'annulation de la réservation : ${error.message}`);
  }
};

// Fonction pour modifier une réservation existante
export const updateReservation = async (idReservation: string, updatedData: Partial<IReservation>) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      idReservation,
      { $set: updatedData },
      { new: true } // Renvoie le document mis à jour
    );
    if (!updatedReservation) {
      throw new Error(`Réservation avec ID ${idReservation} introuvable`);
    }
    return updatedReservation;
  } catch (error: any) {
    throw new Error(`Erreur lors de la modification de la réservation : ${error.message}`);
  }
};

// Fonction pour obtenir la liste des réservations d'un utilisateur spécifique
export const getAllUserReservations = async (userId: string) => {
  try {
    const reservations = await Reservation.find({ userId }).populate('RestaurantId');
    return reservations;
  } catch (error: any) {
    throw new Error(`Erreur lors de la récupération des réservations pour l'utilisateur ${userId} : ${error.message}`);
  }
};

// Fonction pour obtenir toutes les réservations d'un restaurant spécifique
export const getAllRestaurantReservation = async (restaurantId: string) => {
  try {
    const reservations = await Reservation.find({ restaurantId }).populate('userId');
    return reservations;
  } catch (error: any) {
    throw new Error(`Erreur lors de la récupération des réservations pour le restaurant ${restaurantId} : ${error.message}`);
  }
};


// Fonction pour obtenir la liste des réservations d'un utilisateur dans un restaurant spécifique


export const getAllReservationsPerUserAndRestaurant = async (
  userId: string,
  restaurantId: string
) => {
  try {
    const reservations = await Reservation.find({
      userId,
      restaurantId,
    });

    if (reservations.length === 0) {
      throw new Error(
        `Aucune réservation trouvée pour l'utilisateur avec ID ${userId} dans le restaurant avec ID ${restaurantId}`
      );
    }

    return reservations;
  } catch (error: any) {
    throw new Error(
      `Erreur lors de la récupération des réservations : ${error.message}`
    );
  }
};

