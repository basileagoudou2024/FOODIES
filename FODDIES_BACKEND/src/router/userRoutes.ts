import express, { Request, Response } from 'express';
import { loginUser, registerUser } from '../database/queries/userQueries';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/registerUser', async (req: Request, res: Response) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour la connexion
router.post('/login', userController.login);
/*router.post('/loginUser',*/ async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default router;
