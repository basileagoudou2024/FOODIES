
import { Request, Response } from 'express';
import * as evaluationQueries from '../database/queries/evaluationQueries';

export const getAllEvaluations = async (req: Request, res: Response) => {
  try {
    const evaluations = await evaluationQueries.getAllEvaluations();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des évaluations.' });
  }
};

export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const evaluation = await evaluationQueries.createEvaluation(req.body);
    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'évaluation.' });
  }
};

