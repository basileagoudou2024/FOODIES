
// src/routes/evaluationRoutes.ts
import express from 'express';
import { ajouterEvaluation, afficherEvaluationRestaurant} from '../controllers/evaluationController';


const router = express.Router();

router.get('/', afficherEvaluationRestaurant); // Route pour obtenir toutes les évaluations
router.post('/', ajouterEvaluation); // Route pour créer une nouvelle évaluation

export default router;
