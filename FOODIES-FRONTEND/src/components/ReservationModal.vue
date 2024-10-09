

<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { PropType, ref } from 'vue';
  import { Restaurant } from '../shared/interfaces/restaurantInterface';
  import { useI18n } from 'vue-i18n';
  import { useReservationStore } from '../stores/reservationStore';
  
  const { t } = useI18n();
  const reservationStore = useReservationStore();
  
  const clients = ref(2);
  const date = ref(new Date().toISOString().split('T')[0]);
  const time = ref("12:00");
  
  const handleReservation = () => {
    reservationStore.bookReservation({
      restaurantId: restaurant._id,
      clients: clients.value,
      date: date.value,
      time: time.value,
    });
    $emit('close');
  };
  
  defineProps({
    restaurant: {
      type: Object as PropType<Restaurant>,
      required: true,
    }
  });
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  