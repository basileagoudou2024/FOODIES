
import Evaluation from '../models/EvaluationModel';
import { IEvaluation } from '../models/EvaluationModel';

export const getAllEvaluations = async (): Promise<IEvaluation[]> => {
  return await Evaluation.find().populate('utilisateur restaurant').exec();
};



export const createEvaluation = async (data: Partial<IEvaluation>): Promise<IEvaluation> => {
  const newEvaluation = new Evaluation(data);
  return await newEvaluation.save();
};
