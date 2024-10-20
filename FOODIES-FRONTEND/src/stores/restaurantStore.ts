import { defineStore } from 'pinia'; 
import axios from 'axios';
import { ref, computed } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { Reservation } from '../shared/interfaces/reservationInterface';
import { Evaluation } from '../shared/interfaces/evaluationInterface';

export const useRestaurantStore = defineStore('restaurantStore', () => {
  const restaurants = ref<Restaurant[]>([]); // Liste des restaurants
  const evaluations = ref<Evaluation[]>([]); // Liste des évaluations
  const searchText = ref(''); // Texte de recherche

  // **Filtres**
  const selectedCuisine = ref(''); // Filtrer par type de cuisine
  const minStars = ref(0); // Filtrer par nombre d’étoiles minimum
  const maxDistance = ref<number | null>(null); // Distance maximale (en km)

  // **Option de tri**
  const sortOption = ref('alphabetical'); // Par défaut : tri alphabétique

  // **Computed : Filtrage + Tri**
  const filteredAndSortedRestaurants = computed(() => {
    console.log('Filtrage avec le texte :', searchText.value); 

    let filtered = [...restaurants.value];

    // **Filtrer par texte de recherche**
    if (searchText.value) {
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
   /* if (maxDistance.value !== null) {
      filtered = filtered.filter(
        (restaurant) => (restaurant.distance ?? Infinity) <= maxDistance.value
      );
    }  */

    // **Appliquer le tri selon l’option choisie**
    if (sortOption.value === 'alphabetical') {
      filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    }/* else if (sortOption.value === 'distance') {
      filtered.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
    }*/else if (sortOption.value === 'rating') {
      filtered.sort((a, b) => (b.averageStars ?? 0) - (a.averageStars ?? 0));
    }

    console.log('Restaurants filtrés :', filtered);
    return filtered;
  });

  /**
   * Mise à jour du texte de recherche.
   * @param newSearchText Le texte saisi.
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
  const addReservation = async (reservation: Reservation): Promise<void> => {
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

  // **Méthode pour récupérer la dernière réservation**
  const getLastReservation = async (userId: string): Promise<Reservation | null> => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reservations/last/${userId}`);
      const lastReservation = response.data;
      console.log('Dernière réservation:', lastReservation);
  
      return lastReservation;
    } catch (error) {
      console.error('Erreur lors de la récupération de la dernière réservation:', error);
      return null;
    }
  };

  /*-----------------------------------------------------
     Gestion des Évaluations 
  -----------------------------------------------------*/
  const addEvaluation = async (evaluation: Evaluation): Promise<void> => {
    try {
      console.log('Envoi de l’évaluation :', evaluation);

      const response = await axios.post(
        'http://localhost:5000/api/evaluations',
        evaluation
      );

      console.log('Réponse du serveur :', response.data);

      if (response.status === 201) {
        console.log('Évaluation enregistrée avec succès');
        evaluations.value.push(evaluation); // Ajouter localement
      } else {
        throw new Error('Erreur lors de l’enregistrement de l’évaluation');
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’évaluation :', error);
    }
  };

  return {
    // **Données accessibles dans le store**
    restaurants,
    evaluations,
    searchText,
    selectedCuisine,
    minStars,
    maxDistance,
    sortOption,
    filteredAndSortedRestaurants,

    // **Méthodes du store**
    fetchRestaurants,
    addReservation,
    getLastReservation,
    addEvaluation,
    updateSearchText,
  };
});
