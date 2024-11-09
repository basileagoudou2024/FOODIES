<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useI18n } from 'vue-i18n';
import ReservationModal from './ReservationModal.vue';
import EvaluationModal from './EvaluationModal.vue';
import { useRestaurantStore } from '../stores/restaurantStore';
import { Reservation } from '@/shared/interfaces/reservationInterface';

const { t } = useI18n();
const restaurantStore = useRestaurantStore();
const showReservationForm = ref(false);
const showEvaluationForm = ref(false);
const hasReservation = ref(false);
const evaluationSubmitted = ref(false);
const showEvaluationButton = ref(false);
const hasEligibleReservation = ref(false);

const props = defineProps<{ restaurant: Restaurant }>();

// Vérifier le statut de toutes les réservations d'un restaurant
const checkReservationStatus = () => {
  const restaurantId = props.restaurant._id;
  const storedReservations = localStorage.getItem('reservationsData');
  const reservations = storedReservations ? JSON.parse(storedReservations)[restaurantId] || [] : [];
  console.log('Reservations for check:', reservations);
  const today = new Date();


  showEvaluationButton.value = hasEligibleReservation.value;
  console.log('Show Evaluation Button:', showEvaluationButton.value);
};

// Vérifier si une évaluation a été soumise pour ce restaurant
const checkEvaluationStatus = () => {
  const evaluation = restaurantStore.evaluations?.[props.restaurant._id];
  evaluationSubmitted.value = evaluation && evaluation.length > 0;
  console.log('Evaluation Submitted:', evaluationSubmitted.value);
};

// Montage du composant : récupérer réservations et évaluations
onMounted(async () => {
  // Check if the restaurant ID is present before proceeding
  if (!props.restaurant || !props.restaurant._id) {
    console.error('Restaurant ID is missing or undefined.');
    return; // Exit the function if the restaurant ID is not defined
  }

  console.log('Component mounted. Restaurant ID:', props.restaurant._id);
  try {
    await restaurantStore.fetchEvaluations(props.restaurant._id);
    checkReservationStatus();
  } catch (error) {
    console.error('Error during onMounted:', error);
  }
});

// Observer les changements des réservations dans le store
watch(() => localStorage.getItem('reservationsData'), (newReservation) => {
  console.log('Watcher triggered. New reservations:', newReservation);
  hasReservation.value = Boolean(newReservation);
  checkReservationStatus();
});



// Gérer la complétion de la réservation
async function handleReservationComplete(idReservation: string) {
  showReservationForm.value = false;
  const reservation = {
    idReservation,
    restaurantId: props.restaurant._id,
    dateReservation: new Date(),
    nombreDePlaces: 0,
    heureReservation: '',
    utilisateurId: '',
    commentaires: '',
  };
  try {
    await restaurantStore.addReservation(reservation);
    hasReservation.value = true;
    // Mettre à jour les réservations dans le localStorage
    const storedReservations = localStorage.getItem('reservationsData');
    const reservations = storedReservations ? JSON.parse(storedReservations) : {};
    reservations[props.restaurant._id] = reservations[props.restaurant._id] || [];
    reservations[props.restaurant._id].push(reservation);
    localStorage.setItem('reservationsData', JSON.stringify(reservations));
    checkReservationStatus(); // Update status after reservation is completed
  } catch (error) {
    console.error('Error during reservation completion:', error);
  }
}

// Gérer la soumission de l'évaluation
async function handleEvaluationComplete() {
  showEvaluationForm.value = false;
  const evaluation = {
    restaurantId: props.restaurant._id,
    _id: '',
    utilisateurId: '',
    idReservation: '',
    noteProprete: 0,
    noteQualite: 0,
    noteService: 0,
    notePrix: 0,
    noteAmbiance: 0,
    noteEtoile: 0,
    commentaire: '',
    dateEvaluation: new Date(),
  };
  try {
    await restaurantStore.addEvaluation(evaluation);
    evaluationSubmitted.value = true;
    checkEvaluationStatus(); // Update status after evaluation is submitted
  } catch (error) {
    console.error('Error during evaluation submission:', error);
  }
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
      <p><strong>{{ t('restaurant.Heures Ouverture') }}:</strong> <span class="value">{{ restaurant.heuresOuverture }}</span></p>
      <!-- Affichage des Propriétés calculées: "Points", "Étoiles", "Meilleur commentaire" -->
      <p><strong>{{ t('restaurant.Points') }}:</strong> <span class="value">{{ restaurant.points || t('restaurant.non évalué') }}</span></p>
      <p>
        <strong>{{ t('restaurant.Étoiles') }}:</strong>
        <span class="value">
          <template v-if="restaurant.etoiles">
            <span v-for="n in Math.floor(restaurant.etoiles)" :key="n" class="star">★</span>
            <span v-if="restaurant.etoiles % 1 !== 0" class="star">☆</span> <!-- Demi-étoile -->
          </template>
          <template v-else>{{ t('restaurant.non évalué') }}</template>
        </span>
      </p>
      <p><strong>{{ t('restaurant.Meilleur commentaire') }}:</strong> <span class="value">{{ restaurant.meilleurCommentaire || t('restaurant.pas de commentaire') }}</span></p>
      <button @click="showReservationForm = true" class="reserve-button">
        {{ t('restaurant.Réserver') }}
      </button>
      <button
        v-if="showEvaluationButton"
        @click="showEvaluationForm = true"
        class="evaluate-button">
        {{ t('restaurant.Évaluer') }}
      </button>
      <!---<p v-else-if="hasReservation && evaluationSubmitted">
        {{ t('restaurant.Évaluation déjà soumise') }}
      </p>-->
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

.star {
  color: gold;       /* Couleur jaune doré */
  font-size: 24px;   /* Ajustez la taille selon vos besoins */
  margin-right: 2px; /* Espacement entre les étoiles */
  text-shadow: 0 0 5px gold; /* Légère lueur pour un effet plus lumineux */
  border: none;      /* Suppression des bordures */
  padding: 0;
}
</style>
