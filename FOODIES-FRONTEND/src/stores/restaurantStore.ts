

import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import {Restaurant} from '../shared/interfaces/restaurantInterface';


export const useRestaurantStore = defineStore('restaurantStore', () => {
  const restaurants = ref<Restaurant[]>([]);

  // Action pour récupérer tous les restaurants depuis l'API
  const fetchRestaurants = async () => {
    try {
      console.log('Fetching restaurants...'); // Ajout du log
    
      const response = await axios.get('http://localhost:5000/api/restaurants'); // Mets l'URL correcte de ton API. (ici, consommation de l'api du backend)
      
      console.log('Restaurants fetched:', response.data); // Vérifie les données

      restaurants.value = response.data;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des restaurants :', error);
    
      // Vérifie si l'erreur a une réponse détaillée (souvent le cas avec Axios)
      if (error.response) {
        console.error('Réponse de l\'API :', error.response.data);
        console.error('Statut de la réponse :', error.response.status);
      } else if (error.request) {
        console.error('La requête a été envoyée, mais aucune réponse n\'a été reçue :', error.request);
      } else {
        console.error('Erreur de configuration de la requête :', error.message);
      }
    }
    
  };

  return { restaurants, fetchRestaurants };
});



