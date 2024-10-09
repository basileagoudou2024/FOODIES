import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface'; // Assurez-vous que cette interface est bien définie.

export const useRestaurantStore = defineStore('restaurantStore', () => {
  
  // Liste des restaurants récupérés depuis l'API
  const restaurants = ref<Restaurant[]>([]);

  // Texte de recherche
  const searchText = ref('');

  // Liste filtrée en fonction du texte de recherche
  const searchResults = computed(() => {
    if (!searchText.value) return restaurants.value;
    const searchTextLower = searchText.value.toLowerCase();
    return restaurants.value.filter((restaurant) =>
      restaurant.nom.toLowerCase().includes(searchTextLower)
        || restaurant.cuisine.toLowerCase().includes(searchTextLower)
        || restaurant.adresse.toLowerCase().includes(searchTextLower)
        || restaurant.averageStars
       
    );
  });

  // Méthode pour mettre à jour le texte de recherche
  function updateSearchText(text: string) {
    searchText.value = text;
  }

  // Action pour récupérer tous les restaurants depuis l'API
  const fetchRestaurants = async () => {
    try {
      console.log('Fetching restaurants...');
      const response = await axios.get('http://localhost:5000/api/restaurants'); // Adapter l'URL si nécessaire
      console.log('Restaurants fetched:', response.data);
      restaurants.value = response.data;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des restaurants :', error);
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

  

  return {
    restaurants,
    searchText,
    searchResults,
    updateSearchText,
    fetchRestaurants,

  };
});
