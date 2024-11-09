


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useI18n } from 'vue-i18n';
import ReservationModal from './ReservationModal.vue';
import EvaluationModal from './EvaluationModal.vue';
import { useRestaurantStore } from '../stores/restaurantStore';

const { t } = useI18n();
const restaurantStore = useRestaurantStore();
const showReservationForm = ref(false);
const showEvaluationForm = ref(false);
const canEvaluate = ref(false);     // Control for displaying "Evaluate" button

const props = defineProps<{ restaurant: Restaurant }>();

// Fonction pour vérifier si l'évaluation est possible -  Check if evaluation is allowed
function updateCanEvaluateStatus() {
  canEvaluate.value = localStorage.getItem(`reservation_${props.restaurant._id}`) !== null;
}

// Initialisation du statut à l'affichage du composant
onMounted(async () => {
  updateCanEvaluateStatus();
  await restaurantStore.fetchEvaluations(props.restaurant._id);
  console.log("onMounted - Initial state of canEvaluate:", canEvaluate.value);
});

// Gestion de la fin de la réservation -  Handle reservation completion
async function handleReservationComplete() {
  showReservationForm.value = false;
  console.log("handleReservationComplete - Reservation completed. Setting canEvaluate to true.");

  // Mise à jour du localStorage
  localStorage.setItem(`reservation_${props.restaurant._id}`, 'true');
  
  // Affichage du bouton "Évaluer"
  updateCanEvaluateStatus();
}

// Gestion de la soumission de l'évaluation - Handle evaluation submission
async function handleEvaluationComplete(evaluationData: any) {
  console.log("handleEvaluationComplete - Function called");
  showEvaluationForm.value = false;
  console.log("handleEvaluationComplete - Evaluation data received:", evaluationData);

  try {
    await restaurantStore.addEvaluation(evaluationData);
    console.log("handleEvaluationComplete - Evaluation added");

    // Suppression de l'élément de localStorage après l'évaluation
    localStorage.removeItem(`reservation_${props.restaurant._id}`);  // dans le but de masquer le bouton "Évaluer"
    updateCanEvaluateStatus(); // Mise à jour pour masquer le bouton "Évaluer"
  } catch (error) {
    console.error('Error submitting evaluation:', error);
  }
}
</script>


<template>
  <div class="restaurant-card">
    <img :src="restaurant.image" alt="Restaurant Image" class="restaurant-image" />
    <div class="restaurant-info">
      <h2>{{ restaurant.nom }}</h2>
      <p><strong>{{ t('restaurant.Adresse') }}:</strong> <span class="value">{{ restaurant.adresse }}</span></p>
      <p><strong>{{ t('restaurant.Téléphone') }}:</strong> <span class="value">{{ restaurant.telephone }}</span></p>
      <p><strong>{{ t('restaurant.Cuisine') }}:</strong> <span class="value">{{ t(`cuisine.${restaurant.cuisine.toLowerCase()}`) }}</span></p>
      <p><strong>{{ t('restaurant.Heures Ouverture') }}:</strong> <span class="value">{{ restaurant.heuresOuverture }}</span></p>

      <!-- Display calculated fields -->
      <p><strong>{{ t('restaurant.Points') }}:</strong> <span class="value">{{ restaurant.points || t('restaurant.non évalué') }}</span></p>
      <p>
        <strong>{{ t('restaurant.Étoiles') }}:</strong>
        <span class="value">
          <template v-if="restaurant.etoiles">
            <span v-for="n in Math.floor(restaurant.etoiles)" :key="n" class="star">★</span>
            <span v-if="restaurant.etoiles % 1 !== 0" class="star">☆</span> <!-- Half-star -->
          </template>
          <template v-else>{{ t('restaurant.non évalué') }}</template>
        </span>
      </p>
      <p><strong>{{ t('restaurant.Meilleur commentaire') }}:</strong> <span class="commentaire_value">{{ restaurant.meilleurCommentaire || t('restaurant.pas de commentaire') }}</span></p>

      <!-- Reservation and Evaluation buttons -->
      <button @click="showReservationForm = true" class="reserve-button">
        {{ t('restaurant.Réserver') }}
      </button>
      <button v-if="canEvaluate" @click="showEvaluationForm = true" class="evaluate-button">
        {{ t('restaurant.Évaluer') }}
      </button>

      <!-- Reservation and Evaluation Modals -->
      <ReservationModal
        v-if="showReservationForm"
        :restaurant="restaurant"
        @close="showReservationForm = false"
        @reservationComplete="handleReservationComplete"
      />

      <EvaluationModal
        v-if="showEvaluationForm"
        :idRestaurant="restaurant._id"
        :restaurantId="restaurant._id"
        :restaurant="{ nom: restaurant.nom }"
        @close="showEvaluationForm = false"
        @evaluationComplete="handleEvaluationComplete"
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
  color:#9b2226;
}

.commentaire_value {

  color: white;
}
 
.star {
  color: gold;
  font-size: 24px;
  margin-right: 2px;
  text-shadow: 0 0 5px gold;
  border: none;
  padding: 0;
}
</style>
