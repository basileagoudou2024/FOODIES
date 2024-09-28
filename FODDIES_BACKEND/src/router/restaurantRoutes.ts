
import express from 'express';
import { getAllRestaurants, createRestaurant } from "../controllers/RestaurantController";

const router = express.Router();

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);

export default router;
