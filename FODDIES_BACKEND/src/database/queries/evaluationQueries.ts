
import Evaluation from '../models/EvaluationModel';




// Créer une nouvelle évaluation
export const creerEvaluation = async (data: any) => {
  return await Evaluation.create(data);
};

// Récupérer toutes les évaluations d'un restaurant
export const getEvaluationsByRestaurant = async (idRestaurant: string) => {
  return await Evaluation.find({ idRestaurant }).sort({ dateEvaluation: -1 });
};

// Calculer la moyenne pondérée d'un utilisateur
export const calculerMoyennePonderee = (evaluation: any) => {
  const { noteProprete, noteQualite, noteService, notePrix, noteAmbiance } = evaluation;
  return (
    noteProprete * 0.3 +
    noteQualite * 0.3 +
    noteService * 0.2 +
    notePrix * 0.1 +
    noteAmbiance * 0.1
  );
};

// Calculer la moyenne pondérée globale pour un restaurant
export const calculerMoyenneGlobale = (evaluations: any[]) => {
  const total = evaluations.reduce((sum, evaluation) => sum + calculerMoyennePonderee(evaluation), 0);
  return evaluations.length ? total / evaluations.length : 0;
};

// Calculer la moyenne d'étoiles
export const calculerMoyenneEtoiles = (evaluations: any[]) => {
  const total = evaluations.reduce((sum, evaluation) => sum + evaluation.noteEtoile, 0);
  return evaluations.length ? total / evaluations.length : 0;
};

// Trouver le meilleur commentaire
export const trouverMeilleurCommentaire = (evaluations: any[]) => {
  const maxPonderee = Math.max(...evaluations.map(calculerMoyennePonderee));
  const meilleurs = evaluations.filter(
    (evaluation) => calculerMoyennePonderee(evaluation) === maxPonderee
  );
  return meilleurs.sort((a, b) => b.dateEvaluation - a.dateEvaluation)[0].commentaire;
};

