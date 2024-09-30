
// src/routes/evaluationRoutes.ts
import express from 'express';
import { getAllEvaluations, /*createEvaluation*/ } from '../controllers/evaluationController';

const router = express.Router();

router.get('/', getAllEvaluations); // Route pour obtenir toutes les évaluations
//router.post('/', createEvaluation); // Route pour créer une nouvelle évaluation

export default router;
