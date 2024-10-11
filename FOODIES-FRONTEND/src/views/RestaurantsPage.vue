<script setup lang="ts">
import { useRestaurantStore } from '../stores/restaurantStore';
import { onMounted, computed } from 'vue';
import RestaurantCard from '../components/RestaurantCard.vue';
import { useI18n } from 'vue-i18n'; // Importation de useI18n pour la 
import NavigatorBar from '@/components/NavigatorBar.vue';
import BootstrapCarousel from '@/components/BootstrapCarousel.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import { useRouter } from 'vue-router';



// Utilisation de `useI18n` dans le composant pour accéder à `$t`
const { t } = useI18n()

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
  <NavigatorBar/>
  <BootstrapCarousel/>
  <MessageDisplay/>
  <div class="restaurant-list">
    {{ t('RestaurantsPage.title') }}
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
