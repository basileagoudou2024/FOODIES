import express from 'express';
import * as reservationController from '../controllers/reservationController';
import {createReservation, recupererReservationsRestaurant } from '../controllers/reservationController';

const router = express.Router();


//  route pour créer une nouvelle réservation

router.post('/', createReservation);
router.get('/:restaurantId', recupererReservationsRestaurant);


export default router;