

import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

// Interface représentant la structure d'un restaurant
interface Restaurant {
  _id: string;
  nom: string;
  adresse: string;
  telephone: string;
  cuisine: string;
  image: string;
  heuresOuverture: string;
  description: string;
  evaluations?: any[]; // On peut inclure les évaluations si elles sont récupérées.
  etoiles?: number; // La moyenne des étoiles calculée
  meilleurCommentaire?: string; // Meilleur commentaire calculé
}

export const useRestaurantStore = defineStore('restaurantStore', () => {
  const restaurants = ref<Restaurant[]>([]);

  // Action pour récupérer tous les restaurants depuis l'API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants'); // Mets l'URL correcte de ton API.
      restaurants.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants :', error);
    }
  };

  return { restaurants, fetchRestaurants };
});
