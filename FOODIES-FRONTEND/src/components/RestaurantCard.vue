<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ReservationModal from './ReservationModal.vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useRestaurantStore } from '../stores/restaurantStore';

const restaurantStore = useRestaurantStore();

const props = defineProps<{ restaurant: Restaurant }>();

const { t } = useI18n();
const showReservationForm = ref(false);
const reservationId = ref<string | null>(null); // Stocker l'ID de réservation

// Ouvrir le formulaire de réservation
const ouvrirReservationForm = () => {
  showReservationForm.value = true;
};

// Fermer la modale et traiter la réponse
const handleModalClose = async (userId: string) => {
  showReservationForm.value = false;

  try {
    // Appeler la méthode du store directement ici
    const response = await restaurantStore.getLastReservation(userId);
    if (response && response.id) {
      reservationId.value = response.id; // Stocker l'ID de réservation
      console.log('Réservation réussie avec ID:', reservationId.value);
    } else {
      console.warn('Aucune réservation trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la réservation:', error);
  }
};

// Ouvrir la modale d'évaluation
const ouvrirEvaluationModal = () => {
  console.log('Ouverture de la modale d\'évaluation pour ID:', reservationId.value);
  // Logique pour afficher la modale d'évaluation
};
</script>

<template>
  <div class="restaurant-card">
    <img :src="restaurant.image" alt="Image du Restaurant" class="restaurant-image" />
    <div class="restaurant-info">
      <h2>{{ restaurant.nom }}</h2>

      <p><strong>{{ t('restaurant.Adresse') }}:</strong> <span class="value">{{ restaurant.adresse }}</span></p>
      <p><strong>{{ t('restaurant.Téléphone') }}:</strong> <span class="value">{{ restaurant.telephone }}</span></p>
      <p><strong>{{ t('restaurant.Cuisine') }}:</strong> <span class="value">{{ t(`cuisine.${restaurant.cuisine.toLowerCase()}`) }}</span></p>
      <p><strong>{{ t('restaurant.Évaluation') }}:</strong> <span class="value">{{ restaurant.evaluation || t('restaurant.non évalué') }} / 5</span></p>
      <p><strong>{{ t('restaurant.Étoiles') }}:</strong> <span class="value">{{ restaurant.averageStars || t('restaurant.non évalué') }} ★</span></p>
      <p><strong>{{ t('restaurant.Heures Ouverture') }}:</strong> <span class="value">{{ restaurant.heuresOuverture }}</span></p>
      <p><strong>{{ t('restaurant.Meilleur commentaire') }}:</strong> <span class="value">"{{ restaurant.bestComment || t('restaurant.pas de commentaire') }}"</span></p>

      <!-- Ouvrir la modale de réservation -->
    <button @click="ouvrirReservationForm">
      {{ t('restaurant.Reserver') }}
    </button>

    <!-- Bouton d'évaluation visible seulement si la réservation a réussi -->
    <button 
      v-if="reservationId" 
      @click="ouvrirEvaluationModal"
      class="evaluate-button"
    >
      {{ t('restaurant.Évaluer') }}
    </button>

     <!-- Modale de réservation -->

    <ReservationModal 
      v-if="showReservationForm" 
      :restaurant="restaurant"
      @close="handleModalClose"/> <!--- Utiliser la réponse de la réservation ici -->
   
     
      
    </div>
  </div>
</template>

<style scoped>
.restaurant-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  margin: 16px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #8d99ae;
}

.restaurant-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.reserve-button, .evaluate-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 5px;
}

.reserve-button:hover, .evaluate-button:hover {
  background-color: #45a049;
}

.restaurant-info {
  text-align: left;
  margin-top: 10px;
}

.restaurant-info h2 {
  font-size: 1.5em;
  font-weight: bold;
  color: blue;
  margin-bottom: 10px;
}

.restaurant-info p {
  margin: 4px 0;
}

.value {
  color: brown;
}
</style>
