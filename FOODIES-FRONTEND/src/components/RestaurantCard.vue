<script setup lang="ts">
import { PropType, ref, computed } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useI18n } from 'vue-i18n'; 
import ReservationModal from './ReservationModal.vue';
import EvaluationModal from './EvaluationModal.vue'; // Importation de la modale d'évaluation

const { t } = useI18n();

// Variables de contrôle pour afficher les modales
const showReservationForm = ref(false);
const showEvaluationForm = ref(false); 

// Simule la réservation effectuée par l'utilisateur
const hasReservation = ref(true); // Initialement false

// Définir les propriétés attendues
defineProps({
  restaurant: {
    type: Object as PropType<Restaurant>,
    required: true,
  },
});

// Gestion de l'état après la réservation
function handleReservationComplete() {
  showReservationForm.value = false;
  hasReservation.value = true; // Permet d'afficher le bouton "Évaluer"
}
</script>

<template>
  <div class="restaurant-card">
    <img :src="restaurant.image" alt="Image du Restaurant" class="restaurant-image" />
    <div class="restaurant-info">
      <h2>{{ restaurant.nom }}</h2>

      <p><strong>{{ t('restaurant.Adresse') }}:</strong> <span class="value">{{ restaurant.adresse }}</span></p>
      <p><strong>{{ t('restaurant.Téléphone') }}:</strong> <span class="value">{{ restaurant.telephone }}</span></p>
      <p><strong>{{ t('restaurant.Cuisine') }}:</strong> <span class="value">{{ t(`cuisine.${restaurant.cuisine.toLowerCase()}`) }}</span></p>
      <p><strong>{{ t('restaurant.Étoiles') }}:</strong> <span class="value">{{ restaurant.averageStars || t('restaurant.non évalué') }}</span></p>
      <p><strong>{{ t('restaurant.Heures Ouverture') }}:</strong> <span class="value">{{ restaurant.heuresOuverture }}</span></p>
      <p><strong>{{ t('restaurant.Evaluation') }}:</strong> <span class="value">{{ restaurant.evaluation || t('restaurant.non évalué') }}</span></p>
      <p><strong>{{ t('restaurant.Meilleur commentaire') }}:</strong> <span class="value">{{ restaurant.bestComment || t('restaurant.pas de commentaire') }}</span></p>

      <!-- Bouton Réserver -->
      <button @click="showReservationForm = true" class="reserve-button">
        {{ t('restaurant.Réserver') }}
      </button>

      <!-- Bouton Évaluer : visible uniquement si une réservation a été effectuée -->
      <button 
        v-if="hasReservation" 
        @click="showEvaluationForm = true" 
        class="evaluate-button">
        {{ t('restaurant.Évaluer') }}
      </button>

      <!-- Modale de réservation -->
      <ReservationModal 
        v-if="showReservationForm" 
        :restaurant="restaurant" 
        @close="showReservationForm = false"
        @reservationComplete="handleReservationComplete" 
      />

      <!-- Modale d'évaluation -->
      <EvaluationModal 
        v-if="showEvaluationForm" 
        :restaurantId="restaurant._id" 
        @close="showEvaluationForm = false" 
      />
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
