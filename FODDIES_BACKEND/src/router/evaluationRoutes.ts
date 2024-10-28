
// src/routes/evaluationRoutes.ts
import express from 'express';
import { ajouterEvaluation, recupererEvaluations } from '../controllers/evaluationController';


const router = express.Router();

router.post('/evaluation', ajouterEvaluation); // Route pour créer une nouvelle évaluation
router.get('/:restaurantId', recupererEvaluations);

export default router;
