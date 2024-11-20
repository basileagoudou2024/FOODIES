import express, { Request, Response } from 'express';
import { registerUser } from '../database/queries/userQueries';
import { confirmCode, login } from '../controllers/userController';
import {register} from '../controllers/userController';
import {resendConfirmationCode} from '../controllers/userController';

const router = express.Router();


// Route pour la création de compte

router.post('/registerUser',  register);       

// Route pour  l'authentification des utilisateurs (connexion)

router.post('/login', login);

// Route pour transmettre le code de confirmation au controleur pour validation

router.post('/validateCode/:utilisateurId', confirmCode)

// Route pour renvoyer nouveau code de confirmation

router.post('/resendCode/:utilisateurId', resendConfirmationCode);

export default router;
