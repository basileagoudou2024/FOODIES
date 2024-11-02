
import Evaluation, {IEvaluation} from '../models/EvaluationModel';

// Créer une nouvelle évaluation

export const creerEvaluation = async (data: any) => {
  try {
    // Validate data (you can add more validation logic as needed)
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data');
    }

    // Create the evaluation
    const evaluation = await Evaluation.create(data);
    return evaluation;
  } catch (error) {
    console.error('Error creating evaluation:', error);
    throw error;
  }
};


// récupérer les évaluations d'un restaurant spécifique


export const getEvaluationsByRestaurant = async (restaurantId: string): Promise<IEvaluation[]> => {
  try {
    return await Evaluation.find({ restaurantId }); // Correct field name
  } catch (error: any) {
    throw new Error(`Erreur lors de la récupération des évaluations: ${error.message}`);
  }
};

