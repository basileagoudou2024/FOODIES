
import Evaluation, {IEvaluation} from '../models/EvaluationModel';

// Créer une nouvelle évaluation

export const creerEvaluation = async (data: any) => {
  try {
    // Validation approfondie de chaque champ requis
    if (
      !data ||
      typeof data !== 'object' ||
      typeof data.noteQualite !== 'number' ||
      typeof data.noteProprete !== 'number' ||
      typeof data.notePrix !== 'number' ||
      typeof data.noteService !== 'number' ||
      typeof data.noteAmbiance !== 'number' ||
      typeof data.noteEtoile !== 'number' ||
      data.noteQualite < 1 || data.noteQualite > 5 ||
      data.noteProprete < 1 || data.noteProprete > 5 ||
      data.notePrix < 1 || data.notePrix > 5 ||
      data.noteService < 1 || data.noteService > 5 ||
      data.noteAmbiance < 1 || data.noteAmbiance > 5 ||
      data.noteEtoile < 1 || data.noteEtoile > 5 ||
      !data.utilisateurId ||
      !data.restaurantId
    ) {
      throw new Error('Données d’évaluation invalides');
    }

    // Création de l'évaluation
    const evaluation = await Evaluation.create(data);
    return evaluation;

  } catch (error: any) {
    if (error.name === 'MongoError') {
      console.error('Erreur MongoDB lors de la création de l’évaluation :', error.message);
    } else if (error.name === 'ValidationError') {
      console.error('Erreur de validation lors de la création de l’évaluation :', error.message);
    } else {
      console.error('Erreur inattendue lors de la création de l’évaluation :', error.message);
    }

    // Propagation de l'erreur pour un traitement ultérieur
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

