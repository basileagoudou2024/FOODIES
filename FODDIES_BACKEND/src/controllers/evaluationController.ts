// evaluationController.ts

import { Request, Response } from 'express';
import { creerEvaluation, getEvaluationsByRestaurant } from '../database/queries/evaluationQueries';

// Créer une évaluation
export const ajouterEvaluation = async (req: Request, res: Response) => {
  try {
    console.log('Requête reçue :', req.body);
    const evaluation = await creerEvaluation(req.body);
    res.status(201).json({ message: 'Évaluation enregistrée avec succès.' });

  } catch (error: any) {
    console.error('Erreur lors de l’enregistrement de l’évaluation :', error);
    res.status(500).json({ error: error.message }); // Retourne un message d'erreur explicite
  }
};

// Récupérer les évaluations d'un restaurant
export const recupererEvaluations = async (req: Request, res: Response) => {
  const { restaurantId } = req.params; // Récupérer l'id du restaurant depuis les paramètres

  try {
    console.log('Récupération des évaluations pour le restaurant dont l\'ID est:', restaurantId);
    const evaluations = await getEvaluationsByRestaurant(restaurantId);
    console.log('Évaluations trouvées:', evaluations);

    if (!evaluations || evaluations.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(evaluations);
  } catch (error: any) {
    console.error('Erreur lors de la récupération des évaluations:', error);
    res.status(500).json({ error: `Erreur serveur: ${error.message}` });
  }
};
