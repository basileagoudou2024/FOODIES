import express, { Request, Response } from 'express';
import { loginUser, registerUser } from '../database/queries/userQueries';

const router = express.Router();

// Route pour l'enregistrement
router.post('/api/Users', async (req: Request, res: Response) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour la connexion
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
