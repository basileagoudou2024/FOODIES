import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { Reservation } from '../shared/interfaces/reservationInterface';

export const useRestaurantStore = defineStore('restaurantStore', () => {
  const restaurants = ref<Restaurant[]>([]); // Liste des restaurants
  const searchText = ref(''); // Texte de recherche

  // **Filtres**
  const selectedCuisine = ref(''); // Filtrer par type de cuisine
  const minStars = ref(0); // Filtrer par nombre d’étoiles minimum
  const maxDistance = ref<number | null>(null); // Distance maximale (en km)

  // **Option de tri**
  const sortOption = ref('alphabetical'); // Par défaut : tri alphabétique

  // **Computed : Filtrage + Tri**
  const filteredAndSortedRestaurants = computed(() => {

    console.log('Filtrage avec le texte :', searchText.value); // Log du texte de recherche

    let filtered = restaurants.value;

    // **Filtrer par texte de recherche**
    if (!searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.nom.toLowerCase().includes(searchLower) ||
          restaurant.cuisine.toLowerCase().includes(searchLower) ||
          restaurant.adresse.toLowerCase().includes(searchLower)
      );
    }

    // **Filtrer par type de cuisine**
    if (selectedCuisine.value) {
      filtered = filtered.filter(
        (restaurant) => restaurant.cuisine === selectedCuisine.value
      );
    }

    // **Filtrer par nombre d’étoiles minimum**
    if (minStars.value > 0) {
      filtered = filtered.filter(
        (restaurant) => (restaurant.averageStars ?? 0) >= minStars.value
      );
    }

    // **Filtrer par distance maximale**
    if (maxDistance.value !== null) {
      filtered = filtered.filter(
        (restaurant) => restaurant.distance <= maxDistance.value!
      );
    }

    // **Appliquer le tri selon l’option choisie**
    if (sortOption.value === 'alphabetical') {
      filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sortOption.value === 'distance') {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortOption.value === 'rating') {
      filtered.sort((a, b) => b.averageStars - a.averageStars);
    }

    console.log('Restaurants filtrés :', filtered); // Log de la liste filtrée

    return filtered;
  });


  /**
   * Mise à jour du texte de recherche et déclenchement du filtrage.
   * @param newSearchText Le texte saisi par l'utilisateur dans la barre de recherche.
   */
  const updateSearchText = (newSearchText: string) => {
    searchText.value = newSearchText;
    restaurants.value = [...restaurants.value]; // Forcer une réévaluation

  };




  // **Récupérer les restaurants depuis l’API**
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      restaurants.value = response.data;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des restaurants :', error);
    }
  };

  
  /*-----------------------------------------------------
     Gestion des Réservations 
  -----------------------------------------------------*/
  const addReservation = async (reservation: Reservation) => {
    try {
      console.log('Envoi de la réservation :', reservation);

      const response = await axios.post(
        'http://localhost:5000/api/reservations',
        reservation
      );

      console.log('Réponse du serveur après réservation :', response.data);

      if (response.status === 201) {
        console.log('Réservation réussie:', response.data);
      } else {
        throw new Error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Échec de la réservation:', error);
      throw error;
    }
  };

  return {
    // **Données accessibles dans le store**
    restaurants,
    searchText,
    selectedCuisine,
    minStars,
    maxDistance,
    sortOption,
    filteredAndSortedRestaurants,

    // **Méthodes du store**
    fetchRestaurants,
    addReservation,
    updateSearchText, // Ajout de la méthode updateSearchText
  };
});
