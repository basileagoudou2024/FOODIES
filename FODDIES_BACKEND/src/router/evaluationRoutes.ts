
// src/routes/evaluationRoutes.ts
import express from 'express';
import { ajouterEvaluation} from '../controllers/evaluationController';


const router = express.Router();

router.post('/evaluation', ajouterEvaluation); // Route pour créer une nouvelle évaluation

export default router;
