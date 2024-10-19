// evaluationController.ts

import { Request, Response } from 'express';
import { 
  creerEvaluation, 
  getEvaluationsByRestaurant, 
  calculerMoyenneGlobale, 
  calculerMoyenneEtoiles, 
  trouverMeilleurCommentaire 
} from '../database/queries/evaluationQueries';

// Créer une évaluation
export const ajouterEvaluation = async (req: Request, res: Response) => {
  try {
    const evaluation = await creerEvaluation(req.body);
    res.status(201).json(evaluation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer les évaluations et calculer les moyennes
export const afficherEvaluationRestaurant = async (req: Request, res: Response) => {
  try {
    const evaluations = await getEvaluationsByRestaurant(req.params.idRestaurant);
    const moyenneGlobale = calculerMoyenneGlobale(evaluations);
    const moyenneEtoiles = calculerMoyenneEtoiles(evaluations);
    const meilleurCommentaire = trouverMeilleurCommentaire(evaluations);

    res.json({ moyenneGlobale, moyenneEtoiles, meilleurCommentaire });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
