import { Request, Response } from 'express';
import { createRestaurant } from '../database/queries/restaurantQueries';
import RestaurantModel from '../database/models/RestaurantModel';
import { IRestaurant } from '../database/models/RestaurantModel';

export const getAllRestaurantsWithEvaluations = async (req: Request, res: Response) => {
  try {
    // Agrégation pour récupérer tous les restaurants avec leurs évaluations
    const restaurants = await RestaurantModel.aggregate([
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


// Contrôleur pour ajouter un restaurant dans la nase de données -----------------------------------------------------------------------------------
export const ajouterRestaurant = async (req: Request, res: Response) => {
  const { nom, adresse,  telephone, cuisine, heuresOuverture, image, utilisateurs, evaluations,  } = req.body;

  try {
    // Vérifier les données obligatoires
    if (!nom || !adresse || !telephone || !cuisine || !heuresOuverture || !image || !utilisateurs || !evaluations) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être renseignés." });
    }

    // Appeler le service pour créer le restaurant
    const nouveauRestaurant: IRestaurant = await createRestaurant({
      nom,
      adresse,
      telephone,
      cuisine,
      heuresOuverture,
      image,
      utilisateurs, // Référence aux utilisateurs liés
      evaluations, // Référence aux évaluations liées
    });

    // Réponse en cas de succès
    res.status(201).json({
      message: "Restaurant créé avec succès.",
      restaurant: nouveauRestaurant,
    });
  } catch (error: any) {
    // Gestion des erreurs
    console.error("Erreur lors de la création du restaurant :", error);
    res.status(500).json({ message: "Impossible de créer le restaurant.", error: error.message });
  }
};



// Controlleur pour Supprimer un restaurant de la base de données --------------------------------------------------------------------------------
export const supprimerRestaurant = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    // Vérifier si le restaurant existe
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant non trouvé." });
    }

    // Supprimer le restaurant
    await RestaurantModel.findByIdAndDelete(restaurantId);

    res.status(200).json({ message: "Restaurant supprimé avec succès." });
  } catch (error: any) {
    res.status(500).json({ message: "Erreur lors de la suppression du restaurant.", error: error.message });
  }
};


