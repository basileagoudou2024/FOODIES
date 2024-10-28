// src/queries/restaurantQueries.ts
import Restaurant, { IRestaurant } from '../models/RestaurantModel';

export const getAllRestaurants = async (): Promise<IRestaurant[]> => {
  try {
    // Récupère tous les restaurants avec les utilisateurs et les évaluations associés
    return await Restaurant.find()
      .populate('utilisateurs') // Populate des utilisateurs
      .populate({
        path: 'evaluations', // Populate des évaluations
        options: { sort: { dateEvaluation: 1 } }, // Trie par date d’évaluation
      })
      .exec();
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants:', error);
    throw new Error('Impossible de récupérer les restaurants');
  }
};

export const createRestaurant = async (data: Partial<IRestaurant>): Promise<IRestaurant> => {
  try {
    const newRestaurant = new Restaurant(data);
    return await newRestaurant.save();
  } catch (error) {
    console.error('Erreur lors de la création du restaurant:', error);
    throw new Error('Impossible de créer le restaurant');
  }
};
