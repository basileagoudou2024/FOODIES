import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { Reservation } from '../shared/interfaces/reservationInterface';
import { Evaluation } from '../shared/interfaces/evaluationInterface';

export const useRestaurantStore = defineStore('restaurantStore', () => {
  const restaurants = ref<Restaurant[]>([]);
  const evaluations = ref<Evaluation[]>([]);
  const searchText = ref('');

  // **Filtres et options**
  const selectedCuisine = ref('');
  const minStars = ref(0);
  const sortOption = ref('alphabetical');

  // **Computed : Filtrage + Tri**
  const filteredAndSortedRestaurants = computed(() => {
    let filtered = [...restaurants.value];

    // **Filtrage par texte de recherche**
    if (searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      filtered = filtered.filter(restaurant =>
        restaurant.nom.toLowerCase().includes(searchLower) ||
        restaurant.cuisine.toLowerCase().includes(searchLower) ||
        restaurant.adresse.toLowerCase().includes(searchLower)
      );
    }

    // **Filtrage et tri**
    if (selectedCuisine.value) {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine.value);
    }
    if (minStars.value > 0) {
      filtered = filtered.filter(restaurant => (restaurant.averageStars ?? 0) >= minStars.value);
    }
    if (sortOption.value === 'alphabetical') {
      filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sortOption.value === 'rating') {
      filtered.sort((a, b) => (b.averageStars ?? 0) - (a.averageStars ?? 0));
    }

    return filtered;
  });

  /** Méthode pour récupérer les restaurants depuis l’API */
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      restaurants.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants :', error);
    }
  };

  /** Méthode pour gérer les réservations */
  const addReservation = async (reservation: Reservation): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', reservation);
      if (response.status === 201) {
        localStorage.setItem('reservationData', JSON.stringify({
          idReservation: response.data.id,
          idRestaurant: reservation.idRestaurant,
        }));
      } else {
        throw new Error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Échec de la réservation:', error);
      throw error;
    }
  };

  /** Méthode pour gérer les évaluations */
  const addEvaluation = async (evaluation: Evaluation): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:5000/api/evaluations', evaluation);
      if (response.status === 201) {
        evaluations.value.push(evaluation);
        localStorage.removeItem('reservationData');
      } else {
        throw new Error('Erreur lors de l’enregistrement de l’évaluation');
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’évaluation :', error);
    }
  };

  return {
    restaurants,
    evaluations,
    searchText,
    selectedCuisine,
    minStars,
    sortOption,
    filteredAndSortedRestaurants,
    fetchRestaurants,
    addReservation,
    addEvaluation,
  };
});
