import { Request, Response } from 'express';
import Restaurant from '../database/models/RestaurantModel';

export const getAllRestaurantsWithEvaluations = async (req: Request, res: Response) => {
  try {
    // Agrégation pour récupérer tous les restaurants avec leurs évaluations
    const restaurants = await Restaurant.aggregate([
      // Jointure pour inclure les évaluations associées
      {
        $lookup: {
          from: 'evaluations',
          localField: '_id',
          foreignField: 'restaurant',
          as: 'evaluations',
          pipeline: [
            { $sort: { dateEvaluation: 1 } }, // Trie les évaluations par date (ancien -> nouveau)
          ],
        },
      },
      // Calcul de la moyenne des étoiles et du meilleur commentaire
      {
        $addFields: {
          averageStars: {
            $cond: {
              if: { $gt: [{ $size: '$evaluations' }, 0] }, // Vérifie s'il y a des évaluations
              then: { $avg: '$evaluations.noteEtoile' }, // Calcule la moyenne si des évaluations existent
              else: null, // Sinon, met null
            },
          },
          bestComment: {
            $cond: {
              if: { $gt: [{ $size: '$evaluations' }, 0] }, // Vérifie s'il y a des évaluations
              then: { $arrayElemAt: ['$evaluations.commentaire', 0] }, // Prend le premier commentaire (le plus ancien)
              else: null, // Sinon, met null
            },
          },
        },
      },
    ]);

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants avec évaluations :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des restaurants.' });
  }
};
