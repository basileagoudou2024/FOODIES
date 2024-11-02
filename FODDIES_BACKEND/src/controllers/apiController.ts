
import { Request, Response } from 'express';

export const getPublicData = async (req: Request, res: Response) => {
  const { accessLevel } = (req as any).externalUser;

  if (accessLevel === 'read-only') {
    // Limiter les données pour un accès en lecture seule
    res.json({ data: 'Données publiques en lecture seule' });
  } else if (accessLevel === 'read-write') {
    // Accès complet en lecture/écriture
    res.json({ data: 'Données complètes en lecture/écriture' });
  }
};