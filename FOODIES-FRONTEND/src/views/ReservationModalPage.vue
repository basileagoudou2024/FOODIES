<script setup lang="ts">
import BootstrapCarousel from '@/components/BootstrapCarousel.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import NavigatorBar from '@/components/NavigatorBar.vue';
import ReservationModal from '@/components/ReservationModal.vue';
import { Restaurant } from '@/shared/interfaces/restaurantInterface';

// Définir un restaurant par défaut pour tester la modale
const restaurant: Restaurant = {
  _id: '',
  nom: 'Restaurant Exemple',
  adresse: '123 Rue de Paris, 75000 Paris',
  telephone: '01 23 45 67 89',
  cuisine: 'Française',
  averageStars: 4.5,
  heuresOuverture: '12:00 - 22:00',
  bestComment: 'Excellent restaurant avec une ambiance chaleureuse !',
  image: 'https://via.placeholder.com/300',
};


</script>

<template>
  <NavigatorBar/>
  <BootstrapCarousel/>
  <MessageDisplay/>
  <ReservationModal :restaurant="restaurant"/>

</template>
