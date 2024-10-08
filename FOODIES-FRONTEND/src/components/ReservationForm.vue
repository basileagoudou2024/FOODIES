<script setup lang="ts">
import { PropType, ref } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useI18n } from 'vue-i18n';
import { useReservationStore } from '../stores/reservationStore';

const { t } = useI18n();
const reservationStore = useReservationStore();
const emit = defineEmits(['close']);

defineProps({
  restaurant: {
    type: Object as PropType<Restaurant>,
    required: true,
  },
});

// Champs de réservation
const clients = ref(2);
const date = ref(new Date().toISOString().split('T')[0]);
const time = ref("12:00 PM");

const handleReservation = () => {
  reservationStore.bookReservation({
    restaurantId: restaurant._id,
    clients: clients.value,
    date: date.value,
    time: time.value,
  });
  emit('close'); // Fermer le formulaire après réservation
};
</script>

<template>
  <div class="reservation-form">
    <h2>{{ t('reservation.title') }}: {{ restaurant.nom }}</h2>
    <label>{{ t('reservation.clients') }}</label>
    <input type="number" v-model="clients" min="1" />
    <label>{{ t('reservation.date') }}</label>
    <input type="date" v-model="date" />
    <label>{{ t('reservation.time') }}</label>
    <input type="time" v-model="time" />
    <button @click="handleReservation">{{ t('reservation.submit') }}</button>
    <button @click="$emit('close')">{{ t('reservation.cancel') }}</button>
  </div>
</template>

<style scoped>
.reservation-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

button {
  margin: 10px 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:first-of-type {
  background-color: #4CAF50;
  color: white;
}

button:last-of-type {
  background-color: #f44336;
  color: white;
}
</style>
