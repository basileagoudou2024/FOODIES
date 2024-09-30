
<script setup lang="ts">
import { PropType } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';

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
      <h2>{{ restaurant.nom }}</h2>  
      <p><strong>Adresse:</strong> {{ restaurant.adresse }}</p>
      <p><strong>Téléphone:</strong> {{ restaurant.telephone }}</p>
      <p><strong>Cuisine:</strong> {{ restaurant.cuisine }}</p>
      <p><strong>Étoiles:</strong> {{ restaurant.averageStars || 'Pas encore évalué' }}</p>
      <p><strong>Heures d'ouverture:</strong> {{ restaurant.heuresOuverture }}</p>
      <p><strong>Meilleur commentaire:</strong> {{ restaurant.bestComment || 'Aucun commentaire' }}</p>
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
  margin-bottom: 10px;
}

.restaurant-info p {
  margin: 4px 0;
}
</style>
