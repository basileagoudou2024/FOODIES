import { Request, Response } from 'express';
import {
  addReservation,
  cancelReservation,
  updateReservation,
  getAllUserReservations,
  getAllReservationsPerUserAndRestaurant,
} from '../database/queries/reservationQueries';

// Ajouter une nouvelle réservation
export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body;
    const newReservation = await addReservation(reservationData);
    return res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation: newReservation,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Annuler (supprimer) une réservation par son ID
export const deleteReservation = async (req: Request, res: Response) => {
  const { idReservation } = req.params;
  try {
    const result = await cancelReservation(idReservation);
    return res.status(200).json({ message: result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Modifier une réservation existante par son ID
export const editReservation = async (req: Request, res: Response) => {
  const { idReservation } = req.params;
  const updatedData = req.body;
  try {
    const updatedReservation = await updateReservation(idReservation, updatedData);
    return res.status(200).json({
      message: 'Réservation mise à jour avec succès',
      reservation: updatedReservation,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les réservations d'un utilisateur spécifique
export const getUserReservations = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const reservations = await getAllUserReservations(userId);
    return res.status(201).json({
      message: `Réservations trouvées pour l'utilisateur avec ID ${userId}`,
      reservations,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Récupérer les réservations d'un utilisateur pour un restaurant spécifique
export const getReservationsByUserAndRestaurant = async (req: Request, res: Response) => {
    const { userId, restaurantId } = req.params;
    try {
      const reservations: any = await getReservationsByUserAndRestaurantQuery(userId, restaurantId);
      return res.status(200).json({
        message: `Réservations trouvées pour l'utilisateur avec ID ${userId} dans le restaurant avec ID ${restaurantId}`,
        reservations,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  // Rename the inner function to avoid naming conflict
  const getReservationsByUserAndRestaurantQuery = async (userId: string, restaurantId: string) => {
    // implementation here
  };


