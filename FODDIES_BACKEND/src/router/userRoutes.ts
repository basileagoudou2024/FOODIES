
// src/routes/userRoutes.ts
import express from 'express';
import { getAllUsers, /*createUser*/ } from '../controllers/userController';

const router = express.Router();

router.get('/', getAllUsers); // Route pour obtenir tous les utilisateurs
//router.post('/', createUser); // Route pour créer un nouvel utilisateur

export default router;
