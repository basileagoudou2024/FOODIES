
import Evaluation from '../models/EvaluationModel';




// Créer une nouvelle évaluation
export const creerEvaluation = async (data: any) => {
  return await Evaluation.create(data);
};



