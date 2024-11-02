
import { Request, Response } from 'express';
import { createExternalUser } from '../services/externalUserService';

export const registerExternalUser = async (req: Request, res: Response) => {
  const { companyName, contactEmail, accessLevel } = req.body;

  try {
    const newUser = await createExternalUser(companyName, contactEmail, accessLevel);
    res.status(201).json({ message: 'Utilisateur externe créé avec succès', apiKey: newUser.apiKey });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur externe', error });
  }
};