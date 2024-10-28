
import Evaluation from '../models/EvaluationModel';




// Créer une nouvelle évaluation
export const creerEvaluation = async (data: any) => {
  return await Evaluation.create(data);
};

// récupérer les évaluations d'un restaurant spécifique
export const getEvaluationsByRestaurant = async (restaurantId: string) => {
  try {
    return await Evaluation.find({ restaurant: restaurantId });
  } catch (error: any) {
    throw new Error(`Erreur lors de la récupération des évaluations: ${error.message}`);
  }
};

