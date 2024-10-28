<script setup lang="ts">
import { PropType, ref, onMounted, watch } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useI18n } from 'vue-i18n';
import ReservationModal from './ReservationModal.vue';
import EvaluationModal from './EvaluationModal.vue';
import { useRestaurantStore } from '../stores/restaurantStore';

const { t } = useI18n();
const restaurantStore = useRestaurantStore();
console.log(restaurantStore.restaurants); // Use the restaurantStore variable

const showReservationForm = ref(false);
const showEvaluationForm = ref(false);
const hasReservation = ref(false);
const evaluationSubmitted = ref(false); // Nouveau : pour gérer la soumission de l'évaluation

const props = defineProps({
  restaurant: {
    type: Object as PropType<Restaurant>,
    required: true,
  },
});

// Vérifier l'état de réservation
const checkReservationStatus = () => {
  const reservationData = JSON.parse(localStorage.getItem('reservationData') || '{}');
  hasReservation.value = reservationData.restaurant === props.restaurant._id;

};

// Vérifier si l'évaluation a déjà été soumise
const checkEvaluationStatus = () => {
  const evaluationData = localStorage.getItem(`evaluation_${props.restaurant._id}`);
  evaluationSubmitted.value = !!evaluationData;

};


// **(vérifier la récupération des évaluations, l'état des réservations et des évaluations) au montage du composant**

onMounted(async () => {
  checkReservationStatus();
  checkEvaluationStatus();

});


//**watch pour Observer les changements de reservationData dans le localStorage et mettre à jour le statut de réservation*/
watch(() => localStorage.getItem('reservationData'), (newValue) => {
  console.log('Reservation Data Updated:', newValue);
  checkReservationStatus();
});


// Gestion de la complétion de la réservation
function handleReservationComplete(idReservation: string) {
  showReservationForm.value = false;
  localStorage.setItem('reservationData', JSON.stringify({ idReservation, idRestaurant: props.restaurant._id }));
  hasReservation.value = true;
}

// Gestion de la soumission de l'évaluation
function handleEvaluationComplete() {
  showEvaluationForm.value = false;
  evaluationSubmitted.value = true;
  localStorage.setItem(`evaluation_${props.restaurant._id}`, 'submitted'); // Sauvegarder l'état
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
      <p><strong>{{ t('restaurant.Heures Ouverture') }}:</strong><span class="value">{{ restaurant.heuresOuverture }}</span></p>

      <!-- Affichage des Propriétés calculées: "Points", "Étoiles", "Meilleur commentaire" -->
      <p><strong>{{ t('restaurant.Points') }}:</strong> <span class="value">{{ restaurant.points || t('restaurant.non évalué') }}</span></p>
      <p>
  <strong>{{ t('restaurant.Étoiles') }}:</strong>
  <span class="value">
    <template v-if="restaurant.etoiles">
      <span 
        v-for="n in Math.floor(restaurant.etoiles)" 
        :key="n" 
        class="star">★</span>
      <span v-if="restaurant.etoiles % 1 !== 0" class="star">☆</span> <!-- Demi-étoile -->
    </template>
    <template v-else>
      {{ t('restaurant.non évalué') }}
    </template>
  </span>
</p>

      <p><strong>{{ t('restaurant.Meilleur commentaire') }}:</strong><span class="value">{{ restaurant.meilleurCommentaire || t('restaurant.pas de commentaire') }}</span></p>

      <button @click="showReservationForm = true" class="reserve-button">
        {{ t('restaurant.Réserver') }}
      </button>

      <button 
        v-if="hasReservation && !evaluationSubmitted" 
        @click="showEvaluationForm = true" 
        class="evaluate-button">
        {{ t('restaurant.Évaluer') }}
      </button>
      <p v-else-if="hasReservation && evaluationSubmitted">{{ t('restaurant.Évaluation déjà soumise') }}</p>

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
  color: white;
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
