// src/routes/restaurantRoutes.ts
import express from 'express';
import { getAllRestaurants, /*createRestaurant*/ } from '../controllers/restaurantController';

const router = express.Router();

router.get('/', getAllRestaurants); // Route pour obtenir tous les restaurants
//router.post('/', createRestaurant); // Route pour créer un nouveau restaurant

export default router;
