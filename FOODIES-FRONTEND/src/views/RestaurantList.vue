
<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurantStore';
import { onMounted } from 'vue';
import RestaurantCard from '../components/RestaurantCard.vue';


const restaurantStore = useRestaurantStore();

// Lors du montage du composant, récupérer les restaurants
onMounted(() => {
  restaurantStore.fetchRestaurants().then(() => {
    console.log('Données récupérées par le store:', restaurantStore.restaurants);
  });
});

// Accéder aux restaurants récupérés via le store
const restaurants = restaurantStore.restaurants;
</script>



<template>
  <div class="restaurant-list">
    <h1>Liste des Restaurants</h1>
    <div class="restaurant-cards">
      <RestaurantCard
        v-for="restaurant in restaurants" 
        :key="restaurant._id"
        :restaurant="restaurant"
        
      />
      
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
