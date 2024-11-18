import express from 'express';
import { ajouterRestaurant, supprimerRestaurant, getAllRestaurantsWithEvaluations } from '../controllers/RestaurantController';
import { authorizeRole } from '../middlewares/autorizeRole';

const router = express.Router();

// Route pour récupérer tous les restaurants avec leurs évaluations (y compris ceux sans évaluations)
router.get('/', getAllRestaurantsWithEvaluations);

// Exemple : Route pour récupérer un restaurant par son ID
// router.get('/:id', restaurantController.getRestaurantById);

// Exemple : Route pour mettre à jour un restaurant
// router.put('/:id', restaurantController.updateRestaurant);

// Exemple : Route pour supprimer un restaurant
router.delete('/:restaurantId', authorizeRole('Admin'), supprimerRestaurant);

// Route pour créer un nouveau restaurant (peut être activée si nécessaire)
router.post('/', authorizeRole('Admin'), ajouterRestaurant);

export default router;
