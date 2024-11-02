
/*permet de vérifier la clé API de chaque requête provenant des utilisateurs externes */

import { Request, Response, NextFunction } from 'express';
import ExternalUser from '../database/models/ExternalUserModel';



const apiAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) return res.status(401).json({ message: 'API key missing' });

  const externalUser = await ExternalUser.findOne({ apiKey });

  if (!externalUser) return res.status(403).json({ message: 'Invalid API key' });

  (req as any).externalUser = externalUser; // attacher l'utilisateur externe à la requête si nécessaire
  next();
};

export default apiAuthMiddleware;