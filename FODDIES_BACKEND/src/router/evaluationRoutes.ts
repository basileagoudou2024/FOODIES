
// src/routes/evaluationRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import { ajouterEvaluation, recupererEvaluations } from '../controllers/evaluationController';
import {  ProprietaireUserModel } from '../database/models/UserModel';
import { BaseUserModel } from '../database/models/UserModel';


const router = express.Router();

interface EvaluationRequest {
    utilisateurId: string;
    restaurantId: string;
  }


// Middleware pour vérifier les droits d'accès
async function blockOwnerEvaluation(req: Request, res: Response, next: NextFunction) {
    try {
      const { utilisateurId, restaurantId } = req.body;
  
      // Récupérer l'utilisateur de la base de données
      const user = await ProprietaireUserModel.findById(utilisateurId);
  
      if (user && user.restaurantsDetenus?.includes(restaurantId)) {
        return res.status(403).json({
          message: 'Un propriétaire ne peut pas évaluer son propre restaurant.',
        });
      }
  
      next(); // Autoriser l'accès si les conditions sont remplies
    } catch (error: any) {
      res.status(500).json({
        message: 'Erreur serveur lors de la vérification des droits.',
        error: error.message,
      });
    }
  }
router.post('/', ajouterEvaluation); // Route pour créer une nouvelle évaluation



//  Middleware pour verifier les droits d'acces Admin

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const utilisateurId = req.headers['user-id']; // Supposons que l'ID utilisateur est envoyé dans les en-têtes
  
      if (!utilisateurId) {
        return res.status(401).json({ message: 'Utilisateur non authentifié.' });
      }
  
      // Récupérer l'utilisateur depuis la base de données
      const utilisateur = await BaseUserModel.findById(utilisateurId);
  
      if (!utilisateur || utilisateur.typeDeCompte !== 'Admin') {
        return res.status(403).json({ message: "Accès refusé. Réservé aux administrateurs uniquement." });
      }
  
      next(); // Utilisateur est admin, on passe à l'étape suivante
    } catch (error: any) {
      res.status(500).json({ message: 'Erreur serveur lors de la vérification des droits.', error: error.message });
    }
  }
  
router.get('/:restaurantId', recupererEvaluations);   // Route pour obtenir les évaluations d'un restaurant

export default router;




