

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

  // **Watcher pour déclencher une re-computation**
  watch([selectedCuisine, sortOption, minStars, searchText], ([newCuisine, newSortOption, newMinStars, newSearchText]) => {
    console.log(`Cuisine sélectionnée: ${newCuisine}`);
    console.log(`Option de tri: ${newSortOption}`);
    console.log(`Nombre minimum d'étoiles: ${newMinStars}`);
    console.log(`Texte de recherche: ${newSearchText}`);
  });

  // Action pour mettre à jour la cuisine sélectionnée
  function setCuisine(cuisine: string) {
    selectedCuisine.value = cuisine;
  }

  // Action pour mettre à jour l'étoile minimum
  function setMinStars(stars: number) {
    minStars.value = stars;
  }


  // Action pour mettre à jour le tri par ordre alphabétique
  function setSortOption(option: string) {
    sortOption.value = option;
  }

  

  const filteredAndSortedRestaurants = computed(() => {
    let filtered = [...restaurantsAvecEvaluations.value];

    

    // **Filtrage par texte de recherche**
    if (searchText.value) {
      const searchLower = searchText.value.toLowerCase();
      filtered = filtered.filter(restaurant =>
        restaurant.nom.toLowerCase().includes(searchLower) ||
        restaurant.cuisine.toLowerCase().includes(searchLower) ||
        restaurant.adresse.toLowerCase().includes(searchLower)
      );
    }

    // **Filtrage par type de cuisine et étoiles**
    if (selectedCuisine.value) {
      filtered = filtered.filter(restaurant => restaurant.cuisine === selectedCuisine.value);
    }
    if (minStars.value > 0) {
      filtered = filtered.filter(restaurant => (restaurant.etoiles ?? 0) >= minStars.value);
    }

    // **Tri selon l'option sélectionnée**
    switch (sortOption.value) {
      case 'alphabetical':
        filtered.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'alphabetical_desc':
        filtered.sort((a, b) => b.nom.localeCompare(a.nom));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.etoiles ?? 0) - (a.etoiles ?? 0)); // Meilleurs avis en premier
        break;
      case 'rating_desc':
        filtered.sort((a, b) => (a.etoiles ?? 0) - (b.etoiles ?? 0)); // Pires avis en premier
        break;
    
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

  // **Fonctions de calcul des évaluations**
  function calculerPoints(evaluations: any[]) {
    const total = evaluations.reduce((acc, evaluation) => {
      const { noteAmbiance, notePrix, noteProprete, noteQualite, noteService } = evaluation;
      return acc + noteAmbiance + notePrix + noteProprete + noteQualite + noteService;
    }, 0);
    return evaluations.length ? (total / (evaluations.length * 5)).toFixed(2) : 'Non évalué';
  }

  function calculerEtoiles(evaluations: any[]) {
    const totalEtoiles = evaluations.reduce((acc, evaluation) => acc + evaluation.noteEtoile, 0);
    return evaluations.length ? (totalEtoiles / evaluations.length).toFixed(1) : 'Non évalué';
  }

  function trouverMeilleurCommentaire(evaluations: any[]) {
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

  // Calculs appliqués à chaque restaurant au moment de la récupération
  const restaurantsAvecEvaluations = computed(() =>
    restaurants.value.map(restaurant => ({
      ...restaurant,
      points: Number(calculerPoints(restaurant.evaluations)),
      etoiles: Number(calculerEtoiles(restaurant.evaluations)),
      meilleurCommentaire: trouverMeilleurCommentaire(restaurant.evaluations),
    }))
  );

  /** Méthode pour faire une nouvelle réservation depuis l'API et enregistrer */
  const addReservation = async (reservation: Reservation): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', reservation);
      if (response.status === 201) {
        localStorage.setItem(
          'reservationData',
          JSON.stringify({ idReservation: response.data.id, restaurantId: reservation.restaurantId })
        );
      } else {
        throw new Error('Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Échec de la réservation:', error);
      throw error;
    }
  };

   /** Méthode pour créer une nouvelle évaluation depuis l’API et enregistrer */
  const addEvaluation = async (evaluation: Evaluation): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:5000/api/evaluations', evaluation);
      if (response.status === 201) {
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
    addReservation,
    addEvaluation,
    updateSearchText: (text: string) => (searchText.value = text),
  };
});
