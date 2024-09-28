<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRestaurantStore } from '../stores/restaurantStore';
import RestaurantCard from '../components/RestaurantCard.vue'; // Importer le composant RestaurantCard

export default defineComponent({
  name: 'RestaurantList',
  components: { RestaurantCard }, // Déclaration du composant dans RestaurantList
  setup() {
    const restaurantStore = useRestaurantStore();

    // Récupérer les restaurants lors du montage du composant
    onMounted(() => {
      restaurantStore.fetchRestaurants();
    });

    return { restaurantStore };
  },
});
</script>

<template>
  <div>
    <!-- Affichage de la liste des restaurants sous forme de cartes -->
    <div class="restaurant-list">
      <RestaurantCard
        v-for="restaurant in restaurantStore.restaurants"
        :key="restaurant._id"
        :restaurant="restaurant"
      />
    </div>

    <!-- Message si aucun restaurant n'est disponible -->
    <div v-if="restaurantStore.restaurants.length === 0">
      Aucun restaurant disponible.
    </div>
  </div>
</template>

<style scoped>
/* Styles pour la liste de restaurants */
.restaurant-list {
  display: flex;
  flex-wrap: wrap; /* Les cartes s'afficheront sur plusieurs lignes si nécessaire */
  gap: 16px; /* Espacement entre chaque carte */
}
</style>
