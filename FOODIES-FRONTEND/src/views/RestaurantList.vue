<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurantStore';
import { onMounted, computed } from 'vue';
import RestaurantCard from '../components/RestaurantCard.vue';

// Récupérer l'instance du store
const restaurantStore = useRestaurantStore();

// Lors du montage du composant, récupérer les restaurants
onMounted(() => {
  restaurantStore.fetchRestaurants().then(() => {
    console.log('Données récupérées par le store:', restaurantStore.restaurants);
  });
});

// Accéder à la liste filtrée des restaurants en fonction du texte de recherche
const filteredRestaurants = computed(() => restaurantStore.searchResults);
</script>

<template>
  <div class="restaurant-list">
    <h1>Liste des Restaurants</h1>
    <div v-if="filteredRestaurants && filteredRestaurants.length > 0" class="restaurant-cards">
      <RestaurantCard
        v-for="restaurant in filteredRestaurants"
        :key="restaurant._id"
        :restaurant="restaurant"
      />
    </div>
    <div v-else>
      <p>Aucun restaurant à afficher.</p>
    </div>
  </div>
</template>

<style scoped>
.restaurant-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.restaurant-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
