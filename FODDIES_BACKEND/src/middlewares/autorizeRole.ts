

import { Request, Response, NextFunction } from 'express';
import { IBaseUser } from '../database/models/UserModel';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  IBaseUser?: IBaseUser;
}


/*export const authorizeRole = (role: string) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
      if (req.IBaseUser?.typeDeCompte !== role) {
        return res.status(403).json({ message: "Accès interdit pour ce rôle." });
      }
      next();
    };
  };  */


  // Middleware to authorize admin role
export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] ?? '';
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? '') as { typeDeCompte: string };

    if (decodedToken.typeDeCompte !== role) {
      console.log('User role is not authorized:', decodedToken.typeDeCompte);
      return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
    }

    next();
  };
};

  