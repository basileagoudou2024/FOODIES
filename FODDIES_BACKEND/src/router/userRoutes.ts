import express, { Request, Response } from 'express';
import { registerUser } from '../database/queries/userQueries';
import { login } from '../controllers/userController';

const router = express.Router();

router.post('/registerUser', async (req: Request, res: Response) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour la  l'authentification des utilisateurs (connexion)

router.post('/login', login);

/*router.post('/loginUser', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};  */

export default router;
