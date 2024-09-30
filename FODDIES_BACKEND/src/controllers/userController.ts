

import { Request, Response } from 'express';
import * as userQueries from '../database/queries/userQueries';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userQueries.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};



export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userQueries.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
  }
};

