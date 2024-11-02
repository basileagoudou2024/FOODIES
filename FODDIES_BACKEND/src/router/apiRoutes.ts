
import express from 'express';
import apiAuthMiddleware from '../middleware/apiAuthMiddleware';
import { getPublicData } from '../controllers/apiController';

const router = express.Router();

// Route accessible uniquement via une clé API valide
router.get('/public-data', apiAuthMiddleware, getPublicData);

export default router;