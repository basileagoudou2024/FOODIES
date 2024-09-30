import { Router } from 'express';
import * as restaurantController from '../controllers/RestaurantController';

const router = Router();

// Route pour récupérer tous les restaurants avec leurs évaluations (y compris ceux sans évaluations)
router.get('/', restaurantController.getAllRestaurantsWithEvaluations);

// Route pour créer un nouveau restaurant
//router.post('/', restaurantController.createRestaurant);

// Autres routes pour gérer les restaurants peuvent être ajoutées ici
// Par exemple : router.get('/:id', restaurantController.getRestaurantById);
//              router.put('/:id', restaurantController.updateRestaurant);
//              router.delete('/:id', restaurantController.deleteRestaurant);

export default router;
