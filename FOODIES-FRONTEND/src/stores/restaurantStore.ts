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
    if (!searchText.value) return restaurants.value; // Si aucun texte de recherche, retourner tous les restaurants
    const searchTextLower = searchText.value.toLowerCase(); // Mettre en minuscule pour une recherche insensible à la casse
    return restaurants.value.filter((restaurant) =>
      restaurant.nom.toLowerCase().includes(searchTextLower) ||
      restaurant.cuisine.toLowerCase().includes(searchTextLower) ||
      restaurant.adresse.toLowerCase().includes(searchTextLower) ||
      restaurant.averageStars // Rechercher aussi par les étoiles moyennes
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
      restaurants.value = response.data; // Mise à jour de la liste des restaurants dans l'état du store
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

  /*
   * Action pour ajouter une réservation pour un restaurant donné.
   * @param reservation Les détails de la réservation (nombre de places, date, heure, etc.)
   */
  async function addReservation(reservation: Reservation) {
    try {
      // Envoi de la réservation au backend via une requête POST
      const response = await axios.post('http://localhost:5000/api/reservations', reservation);
      
      // Vérification de la réponse du backend
      if (response.status === 201) {
        console.log('Réservation réussie:', response.data); // Log de succès de la réservation
        // Ici, vous pouvez ajouter la réservation à l'état du store ou déclencher une action supplémentaire si nécessaire.
      } else {
        throw new Error('Erreur lors de la réservation'); // Lever une erreur si la réponse du serveur n'est pas correcte
      }
    } catch (error) {
      console.error('Échec de la réservation:', error); // Log de l'erreur en cas d'échec
      throw error; // Renvoyer l'erreur pour qu'elle puisse être gérée dans le composant appelant
    }
  }

  return {
    // Propriétés accessibles à partir du store
    restaurants,        // Liste des restaurants
    searchText,         // Texte de recherche actuel
    searchResults,      // Résultats filtrés en fonction du texte de recherche

    // Méthodes accessibles à partir du store
    updateSearchText,   // Met à jour le texte de recherche
    fetchRestaurants,   // Récupère les restaurants depuis l'API
    addReservation,     // Envoie une réservation au backend
  };
});
