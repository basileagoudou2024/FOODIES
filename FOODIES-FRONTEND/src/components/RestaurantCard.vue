<script setup lang="ts">
import { PropType, ref} from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useI18n } from 'vue-i18n'; // Importation de useI18n pour la traduction
import ReservationModal from './ReservationModal.vue'


// Utilisation de useI18n dans le composant pour accéder à $t
const { t } = useI18n();


const showReservationForm = ref(false);

// Définir les propriétés attendues par le composant


defineProps({
  restaurant: {
    type: Object as PropType<Restaurant>,
    required: true
  }
});
</script>



<template>
  <div class="restaurant-card">
    <img :src="restaurant.image" alt="Image du Restaurant" class="restaurant-image" />
    <div class="restaurant-info">
      <!-- Le nom du restaurant reste le même dans toutes les langues -->
      <h2>{{ restaurant.nom }}</h2>

      <!-- Traduction des libellés uniquement -->
      <p>
        <strong>{{ t('restaurant.Adresse') }}:</strong>
        <span class="value">{{ restaurant.adresse }}</span>
      </p>
      <p>
        <strong>{{ t('restaurant.Téléphone') }}:</strong>
        <span class="value">{{ restaurant.telephone }}</span>
      </p>
      <p>
        <strong>{{ t('restaurant.Cuisine') }}:</strong>
        <!-- Utilisation de t pour traduire le type de cuisine -->
        <span class="value">{{ t(`cuisine.${restaurant.cuisine.toLowerCase()}`) }}</span>
      </p>

      <p>
        <strong>{{ t('restaurant.Étoiles') }}:</strong>
        <!-- Affichage de la valeur par défaut si averageStars est null -->
        <span class="value">{{ restaurant.averageStars || t('restaurant.non évalué') }}</span>
      </p>
      <p>
        <strong>{{ t('restaurant.Heures Ouverture') }}:</strong>
        <span class="value">{{ restaurant.heuresOuverture }}</span>
      </p>
      <p>
        <strong>{{ t('restaurant.Meilleur commentaire') }}:</strong>
        <!-- Affichage de la valeur par défaut si bestComment est null -->
        <span class="value">{{ restaurant.bestComment || t('restaurant.pas de commentaire') }}</span>
      </p>
      <!-- Nouveau bouton Réserver -->
      <button @click="showReservationForm = true" class="reserve-button">
        {{ t('restaurant.Réserver') }}
      </button>

      <!-- Formulaire de réservation affiché comme une modale -->
      <ReservationModal v-if="showReservationForm" :restaurant="restaurant" @close="showReservationForm = false" />
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
  background-color:#8d99ae;
}

.restaurant-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.reserve-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.reserve-button:hover {
  background-color: #45a049;
}

.restaurant-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
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







