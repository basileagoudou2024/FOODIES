import { Request, Response } from 'express';
import {
  addReservation,
  cancelReservation,
  updateReservation,
  getAllUserReservations,
  getRestaurantReservations,
} from '../database/queries/reservationQueries';

// Ajouter une nouvelle réservation
export const createReservation = async (req: Request, res: Response) => {

  console.log(req.body);

  try {
    const reservationData = req.body;
    console.log('Requête reçue :', req.body);
    const newReservation = await addReservation(reservationData);
    return res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation: newReservation,
    });
  } catch (error: any) {
    console.log(error);
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


  // Récupérer toutes les réservations d'un restaurant spécifique

export const recupererReservationsRestaurant = async (req: Request, res: Response) => {
  const { restaurantId } = req.params; // Récupérer l'id du restaurant depuis les paramètre

  try {

    console.log('le ID du restaurant à récupérer les évaluations est:', req.params)
    const reservations = await  getRestaurantReservations(restaurantId);

    console.log('Reservations trouvées :', reservations);

    if (!reservations|| reservations.length===0) {
      return res.status(200).json([]);
    }
    res.status(200).json(reservations);
  } catch (error: any) {
    res.status(500).json({ error: `Erreur serveur: ${error.message}` });
  }
};