
import express from 'express';
import { registerExternalUser } from '../controllers/externalUserController';

const router = express.Router();

// Route pour enregistrer un utilisateur externe
router.post('/register', registerExternalUser);

export default router;