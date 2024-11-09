/*---------------------------IMPORTATIONS ET SETUP D'INITIALISATION-------------------------------------------*/

import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed, watch } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { Reservation } from '../shared/interfaces/reservationInterface';
import { Evaluation } from '../shared/interfaces/evaluationInterface';

export const useRestaurantStore = defineStore('restaurant', () => {
  const restaurants = ref<Restaurant[]>([]);
  const searchText = ref('');
  const selectedCuisine = ref<string>('');
  const minStars = ref(0);
  const sortOption = ref('alphabetical');
  const evaluations = ref<{ [key: string]: Evaluation[] }>({});
  const reservations = ref<{ [key: string]: Reservation[] }>({}); // Stockage par restaurantId

/*----------------------------------WATCHERS POUR LA RE-COMPUTATION--------------------------------------------*/

  watch([selectedCuisine, sortOption, minStars, searchText], ([newCuisine, newSortOption, newMinStars, newSearchText]) => {
    console.log(`Cuisine sélectionnée: ${newCuisine}`);
    console.log(`Option de tri: ${newSortOption}`);
    console.log(`Nombre minimum d'étoiles: ${newMinStars}`);
    console.log(`Texte de recherche: ${newSearchText}`);
  });

/*-----------------------------------FONCTIONS DE MISE À JOUR---------------------------------------------------*/

  function setCuisine(cuisine: string) {
    selectedCuisine.value = cuisine;
  }

  function setMinStars(stars: number) {
    minStars.value = stars;
  }

  function setSortOption(option: string) {
    sortOption.value = option;
  }

/*-----------------------------------------RESTAURANTS FILTRÉS ET TRIÉS----------------------------------------*/

  const filteredAndSortedRestaurants = computed(() => {
    let filtered = [...restaurantsAvecEvaluations.value];

    if (searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      filtered = filtered.filter(restaurant =>
        restaurant.nom.toLowerCase().includes(searchLower) ||
        restaurant.cuisine.toLowerCase().includes(searchLower) ||
        restaurant.adresse.toLowerCase().includes(searchLower)
      );
    }

    if (selectedCuisine.value) {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine.value);
    }

    if (minStars.value > 0) {
      filtered = filtered.filter(restaurant => (restaurant.etoiles ?? 0) >= minStars.value);
    }

    switch (sortOption.value) {
      case 'alphabetical':
        filtered.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'alphabetical_desc':
        filtered.sort((a, b) => b.nom.localeCompare(a.nom));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.etoiles ?? 0) - (a.etoiles ?? 0));
        break;
      case 'rating_desc':
        filtered.sort((a, b) => (a.etoiles ?? 0) - (b.etoiles ?? 0));
        break;
    }
    return filtered;
  });

/*------------------------------RÉCUPÉRATION DES DONNÉES-----------------------------------------------------*/

  // Tous les restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants');
      restaurants.value = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des restaurants :', error);
    }
  };

  // Toutes les évaluations d'un restaurant spécifique
  const fetchEvaluations = async (restaurantId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/evaluations/${restaurantId}`);
      evaluations.value[restaurantId] = response.data;
      console.log(`Les évaluations pour le restaurant ${restaurantId} sont:`, evaluations.value[restaurantId]);
    } catch (error) {
      console.error('Erreur lors de la récupération des évaluations :', error);
      throw error;
    }
  };

  // Toutes les réservations d'un restaurant spécifique
  const fetchReservations = async (restaurantId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reservations/${restaurantId}`);
      // Remove old reservations from localStorage
      localStorage.removeItem('reservationsData');
      // Store new reservations in localStorage
      localStorage.setItem('reservationsData', JSON.stringify({ [restaurantId]: response.data }));
      reservations.value[restaurantId] = response.data;
      console.log('Fetched reservations for restaurant:', restaurantId, response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };


/*-------------------------------------ACTIONS ASYNCHRONES---------------------------------------------------*/

const addReservation = async (reservation: Reservation): Promise<boolean> => {
  try {
    const response = await axios.post('http://localhost:5000/api/reservations', reservation);
    console.log('Réponse du serveur dans le store:', response.data);

    if (response.status === 201) {
      localStorage.setItem(`reservation_${reservation.restaurantId}`, JSON.stringify({
        idReservation: response.data.id,
        restaurantId: reservation.restaurantId,
      }));
    }

    return true;
    
  } catch (error) {
    console.error('Échec de la réservation:', error);
    throw error;
  }
};


const addEvaluation = async (evaluation: Evaluation): Promise<void> => {
  try {
    console.log('l\'évaluation à soumettre est:', evaluation);
    const response = await axios.post('http://localhost:5000/api/evaluations', evaluation);
    if (response.status === 201) {
      localStorage.removeItem('reservationData');
      // Fetch evaluations again to update the state
      await fetchEvaluations(evaluation.restaurantId);
    }
  } catch (error) {
    console.log(error);
    console.error('Erreur lors de l’envoi de l’évaluation :', error);
  }
};

/*-----------------------------------CALCULS DES ÉVALUATIONS--------------------------------------------------*/

const calculerPoints = (evaluations: Evaluation[]) => {
  const total = evaluations.reduce((acc, { noteAmbiance, notePrix, noteProprete, noteQualite, noteService }) =>
    acc + noteAmbiance + notePrix + noteProprete + noteQualite + noteService, 0);
  return evaluations.length ? (total / (evaluations.length * 5)).toFixed(2) : 'Non évalué';
};

const calculerEtoiles = (evaluations: Evaluation[]) =>
  evaluations.length ? (evaluations.reduce((acc, { noteEtoile }) => acc + noteEtoile, 0) / evaluations.length).toFixed(1) : 'Non évalué';

const trouverMeilleurCommentaire = (evaluations: Evaluation[]): string => {
  if (!evaluations.length) return 'Pas de commentaire';
  const meilleurEval = evaluations.reduce((best, current) => {
    if (
      current.noteEtoile > best.noteEtoile ||
      (current.noteEtoile === best.noteEtoile &&
        new Date(current.dateEvaluation) > new Date(best.dateEvaluation))
    ) {
      return current;
    }
    return best;
  });
  return meilleurEval.commentaire || 'Pas de commentaire';
}

/*-----------------------------------COMPUTED PROPRIÉTÉS------------------------------------------------------*/

const restaurantsAvecEvaluations = computed(() =>
  restaurants.value.map(restaurant => ({
    ...restaurant,
    points: Number(calculerPoints(evaluations.value[restaurant._id] || [])),
    etoiles: Number(calculerEtoiles(evaluations.value[restaurant._id] || [])),
    meilleurCommentaire: trouverMeilleurCommentaire(evaluations.value[restaurant._id] || []),
  }))
);

return {
  restaurants,
  restaurantsAvecEvaluations,
  searchText,
  selectedCuisine,
  setCuisine,
  minStars,
  setMinStars,
  sortOption,
  setSortOption,
  filteredAndSortedRestaurants,
  fetchRestaurants,
  evaluations,
  fetchEvaluations,
  addReservation,
  fetchReservations,
  reservations,
  addEvaluation,
  updateSearchText: (text: string) => (searchText.value = text),
};
});
