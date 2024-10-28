// evaluationController.ts

import { Request, Response } from 'express';
import { creerEvaluation} from '../database/queries/evaluationQueries';

// Créer une évaluation
export const ajouterEvaluation = async (req: Request, res: Response) => {
  try {
    const evaluation = await creerEvaluation(req.body);
    res.status(201).json(evaluation);
  } catch (error: any) {
    res.status(501).json({ error: error.message });
  }
};