<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurantStore';
import { onMounted, computed, watch } from 'vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import { useI18n } from 'vue-i18n';
import NavigatorBar from '@/components/NavigatorBar.vue';
import BootstrapCarousel from '@/components/BootstrapCarousel.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';

// Récupérer l'instance du routeur

// Utilisation de `useI18n` dans le composant pour accéder à `$t`
const { t } = useI18n();

// Récupérer le store des restaurants
const restaurantStore = useRestaurantStore();

// Lors du montage du composant, récupérer les restaurants
onMounted(async () => {
  try {
    await restaurantStore.fetchRestaurants();
    console.log('Données récupérées par le store:', restaurantStore.restaurants);
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants :', error);
  }
});

// Accéder à la liste filtrée et triée des restaurants depuis le store
// Utilisation des restaurants filtrés
const filteredRestaurants = computed(() => restaurantStore.filteredAndSortedRestaurants);

  console.log('Restaurants filtrés :', restaurantStore.filteredAndSortedRestaurants);

  watch(filteredRestaurants, (newValue) => {
  console.log('Restaurants après filtrage:', newValue);
});



</script>

<template>
  <NavigatorBar />
  <BootstrapCarousel />
  <MessageDisplay />

  <div class="restaurant-list">
    <h1>{{ t('RestaurantsPage.title') }}</h1>

    <div v-if="filteredRestaurants && filteredRestaurants.length > 0" class="restaurant-cards">
      <RestaurantCard
        v-for="restaurant in filteredRestaurants"
        :key="restaurant._id"
        :restaurant="restaurant"
      />
    </div>

    <div v-else>
      <p>{{ t('RestaurantsPage.Aucun restaurant à afficher') }}</p>
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
