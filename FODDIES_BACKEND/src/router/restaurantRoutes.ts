import express from 'express';
import * as restaurantController from '../controllers/RestaurantController';

const router = express.Router();

// Route pour récupérer tous les restaurants avec leurs évaluations (y compris ceux sans évaluations)
router.get('/', restaurantController.getAllRestaurantsWithEvaluations);

// Route pour créer un nouveau restaurant (peut être activée si nécessaire)
//router.post('/', restaurantController.createRestaurant);

// Exemple : Route pour récupérer un restaurant par son ID
// router.get('/:id', restaurantController.getRestaurantById);

// Exemple : Route pour mettre à jour un restaurant
// router.put('/:id', restaurantController.updateRestaurant);

// Exemple : Route pour supprimer un restaurant
// router.delete('/:id', restaurantController.deleteRestaurant);

export default router;
