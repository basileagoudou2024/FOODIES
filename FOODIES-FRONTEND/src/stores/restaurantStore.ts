import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { Reservation } from '../shared/interfaces/reservationInterface'; // Assurez-vous que cette interface est bien définie.

export const useRestaurantStore = defineStore('restaurantStore', () => {
  
  // Liste des restaurants récupérés depuis l'API
  const restaurants = ref<Restaurant[]>([]);

  
  // Texte de recherche pour filtrer les restaurants
  const searchText = ref('');

  // Liste filtrée des restaurants en fonction du texte de recherche
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
 /*-----------------------------------------------------Réservation---------------------------------------------------------------*/


  /* Action pour ajouter une réservation pour un restaurant donné.
   * @param reservation Les détails de la réservation
   */
    

  async function addReservation(reservation: Reservation) {
    try {
      // Envoi de la réservation au backend
      const response = await axios.post('/api/reservations', reservation);
      
      // Vérification de la réponse
      if (response.status === 201) {
        console.log('Réservation réussie:', response.data);
      } else {
        throw new Error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Échec de la réservation:', error);
      throw error; // Renvoyer l'erreur pour gérer l'affichage dans le composant
    }
  }

  return {
    // Propriétés
    restaurants,
    addReservation,  // Ajout de la méthode de réservation
    searchText,
    searchResults,

    // Méthodes
    updateSearchText,
    fetchRestaurants,
  
  };
});
