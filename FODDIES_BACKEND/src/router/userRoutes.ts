import express, { Request, Response } from 'express';
import { registerUser } from '../database/queries/userQueries';
import { login } from '../controllers/userController';
import {register} from '../controllers/userController';

const router = express.Router();


// Route pour la création de compte

router.post('/registerUser',  register);       

// Route pour la  l'authentification des utilisateurs (connexion)

router.post('/login', login);

export default router;
