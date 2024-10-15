<script setup lang="ts">
import { ref, defineProps, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import { useRestaurantStore } from '../stores/restaurantStore';
import { Reservation } from '@/shared/interfaces/reservationInterface';
import {jwtDecode} from 'jwt-decode'; // Fix: No curly braces needed
import { defineEmits } from 'vue';

const { t } = useI18n();
const restaurantStore = useRestaurantStore();
const emit = defineEmits(['close']);

const props = defineProps({
  restaurant: {
    type: Object as PropType<Restaurant>,
    required: true,
  },
});

// Form fields
const nombreDePlaces = ref(1);
const dateReservation = ref('');
const heureReservation = ref('');
const commentaires = ref('');
const confirmationMessage = ref('');
const isSubmitting = ref(false); // Loading state

// Decode the user ID from the JWT token
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('userToken');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  console.warn('No token found in localStorage.');
  return null;
};

// Handle form submission
const submitReservation = async () => {
  const userId = getUserIdFromToken();
  if (!userId) {
    console.error("Cannot submit reservation, user not authenticated.");
    return;
  }

  isSubmitting.value = true; // Set loading state

  try {
    const reservationData: Reservation = {
      nombreDePlaces: nombreDePlaces.value,
      dateReservation: dateReservation.value,
      heureReservation: heureReservation.value,
      commentaires: commentaires.value,
      idRestaurant: props.restaurant._id,
      idUtilisateur: userId,
    };

    console.log('Sending reservation data:', reservationData);
    const response = await restaurantStore.addReservation(reservationData);

    console.log('Server response:', response);
    confirmationMessage.value = t('reservation.Confirmation');

    // Reset the form and close the modal after a short delay
    setTimeout(() => {
      resetForm();
      confirmationMessage.value = '';
      emitClose();
    }, 1500);
  } catch (error) {
    console.error('Reservation error:', error);
    confirmationMessage.value = t('reservation.Echec');
  } finally {
    isSubmitting.value = false; // Reset loading state
  }
};

// Reset form fields
const resetForm = () => {
  nombreDePlaces.value = 1;
  dateReservation.value = '';
  heureReservation.value = '';
  commentaires.value = '';
};

// Emit the close event
const emitClose = () => {
  confirmationMessage.value = '';
  resetForm();
  isSubmitting.value = false;
  emit('close');
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="emitClose">&times;</span>
      <h2>{{ restaurant.nom }}</h2>

      <!-- Reservation Form -->
      <form @submit.prevent="submitReservation">
        <label>{{ t('reservation.Nombre de places') }}:</label>
        <input type="number" v-model.number="nombreDePlaces" min="1" required />

        <label>{{ t('reservation.Date de réservation') }}:</label>
        <input type="date" v-model="dateReservation" required />

        <label>{{ t('reservation.Heure de réservation') }}:</label>
        <input type="time" v-model="heureReservation" required />

        <label>{{ t('reservation.Commentaires') }}:</label>
        <textarea
          v-model="commentaires"
          rows="3"
          placeholder="Ajouter des commentaires ici..."
        ></textarea>

        <!-- Submit Button -->
        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">{{ t('reservation.En cours...') }}</span>
          <span v-else>{{ t('reservation.Envoyer') }}</span>
        </button>
      </form>

      <!-- Close Button -->
      <button class="close-button" @click="emitClose">
        {{ t('reservation.Fermer') }}
      </button>

      <!-- Confirmation Message -->
      <p v-if="confirmationMessage" class="confirmation-message">
        {{ confirmationMessage }}
      </p>
    </div>
  </div>
</template>

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
  width: 450px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

input,
textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  resize: none;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}

.close-button {
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.confirmation-message {
  color: green;
  margin-top: 10px;
  text-align: center;
}
</style>
