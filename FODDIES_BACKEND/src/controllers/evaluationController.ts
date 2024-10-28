// evaluationController.ts

import { Request, Response } from 'express';
import { creerEvaluation, getEvaluationsByRestaurant } from '../database/queries/evaluationQueries';

// Créer une évaluation
export const ajouterEvaluation = async (req: Request, res: Response) => {
  try {
    const evaluation = await creerEvaluation(req.body);
    res.status(201).json(evaluation);
  } catch (error: any) {
    res.status(501).json({ error: error.message });
  }
};

// récupérer les évaluations d'un restaurant
export const recupererEvaluations = async (req: Request, res: Response) => {
  const { restaurantId } = req.params; // Récupérer l'id du restaurant depuis les paramètres

  try {
    const evaluations = await getEvaluationsByRestaurant(restaurantId);

    if (!evaluations) {
      return res.status(404).json({ message: "Aucune évaluation trouvée pour ce restaurant." });
    }

    res.status(200).json(evaluations);
  } catch (error: any) {
    res.status(500).json({ error: `Erreur serveur: ${error.message}` });
  }
};