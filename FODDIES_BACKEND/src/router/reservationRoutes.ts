import express from 'express';
import * as reservationController from '../controllers/reservationController';
import {createReservation} from '../controllers/reservationController';

const router = express.Router();


//  route pour créer une nouvelle réservation

router.post('/', createReservation);


export default router;