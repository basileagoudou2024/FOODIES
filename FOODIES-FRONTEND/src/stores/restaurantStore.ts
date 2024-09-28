import { defineStore } from 'pinia';
import axios from 'axios';
import { Restaurant } from '../shared/interfaces/restaurantInterface';

// Définir l'URL de base pour votre API
const BASE_URL = 'http://localhost:5000/api/restaurants';

export const useRestaurantStore = defineStore('restaurantStore', {
  state: () => ({
    restaurants: [] as Restaurant[], // Liste des restaurants
  }),

  getters: {
    // Getter pour récupérer le nombre total de restaurants
    totalRestaurants: (state) => state.restaurants.length,
  },

  actions: {
    // Action pour récupérer les restaurants depuis l'API
    async fetchRestaurants() {
      try {
        console.log('Envoi de la requête vers:', BASE_URL); // Log de l'URL de la requête
        const response = await axios.get(BASE_URL);
        console.log('Réponse reçue:', response.data); // Log des données reçues
        this.restaurants = response.data; // Mise à jour de la liste des restaurants
      } catch (error) {
        console.error('Erreur lors de la récupération des restaurants:', error);
      }
    },
  },
});
