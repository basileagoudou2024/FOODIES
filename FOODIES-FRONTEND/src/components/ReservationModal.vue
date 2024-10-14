<script setup lang="ts">
  import { ref, defineProps, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Restaurant } from '../shared/interfaces/restaurantInterface';
  import { useRestaurantStore } from '../stores/restaurantStore';
  import { Reservation } from '@/shared/interfaces/reservationInterface';
  import {jwtDecode} from 'jwt-decode';  // Correction : import sans accolades

  const { t } = useI18n();
  const restaurantStore = useRestaurantStore();


  const props = defineProps({
    restaurant: {
      type: Object as PropType<Restaurant>,
      required: true,
    },
  });

  // Champs de formulaire
  const nombreDePlaces = ref(1);
  const dateReservation = ref('');
  const heureReservation = ref('');
  const commentaires = ref(''); // Nouveau champ pour les commentaires
  const confirmationMessage = ref('');

  // Méthode pour récupérer l'ID utilisateur depuis le token JWT
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('userToken');
    console.log('Token récupéré depuis le localStorage dans userStore:', token);

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Token décodé:', decodedToken);

        const userId = decodedToken.userId;
        console.log('La valeur de userId est:', userId);

        return userId;
      } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        return null;
      }
    } else {
      console.error("Aucun token trouvé dans le localStorage.");
      return null;
    }
  };

  // Méthode de soumission de la réservation
  const submitReservation = async () => {
    const userId = getUserIdFromToken();

    if (!userId) {
      console.error("Impossible d'envoyer la réservation, l'utilisateur n'est pas authentifié.");
      return;
    }

    try {
      const reservationData: Reservation = {
        nombreDePlaces: nombreDePlaces.value,
        dateReservation: dateReservation.value,
        heureReservation: heureReservation.value,
        commentaires: commentaires.value, // Envoyer le nouveau champ de commentaires
        idRestaurant: props.restaurant._id,
        idUtilisateur: userId, // ID utilisateur authentifié
      };

      // Log de l'objet envoyé
      console.log('Données de réservation envoyées :', reservationData);

      // Envoi de la requête via le store
      const response = await restaurantStore.addReservation(reservationData);

      // Log de la réponse
      console.log('Réponse du serveur :', response);

      // Message de confirmation
      confirmationMessage.value = t('reservation.Confirmation');
    } catch (error) {
      console.error('Erreur lors de la réservation :', error);
      confirmationMessage.value = t('reservation.Echec');
    }
  };
</script>




<template>
    <div class="modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <h2> {{ restaurant.nom }}</h2>
  
        <!-- Formulaire de réservation -->
        <form @submit.prevent="submitReservation">
          <label>{{ t('reservation.Nombre de places') }}:</label>
          <input type="number" v-model.number="nombreDePlaces" min="1" required />
  
          <label>{{ t('reservation.Date de réservation') }}:</label>
          <input type="date" v-model="dateReservation" required />
  
          <label>{{ t('reservation.Heure de réservation') }}:</label>
          <input type="time" v-model="heureReservation" required />
  
          <!-- Nouveau champ pour les commentaires -->
          <label>{{ t('reservation.Commentaires') }}:</label>
          <textarea v-model="commentaires" rows="3" placeholder="Ajouter des commentaires ici..."></textarea>
  
          <!-- Bouton Submit -->
          <button type="submit" class="submit-button">
            {{ t('reservation.Envoyer') }}
          </button>
        </form>
  
        <button class="close-button" @click="$emit('close')">
          {{ t('reservation.Fermer') }}
        </button>
  
        <!-- Message de confirmation après réservation -->

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
  width: 450px; /* Ajuster la largeur si nécessaire */
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
  align-items: flex-start;
}

.form-group {
  display: flex;
  align-items: center; /* Aligner les champs au centre verticalement */
  justify-content: space-between;
  margin-bottom: 15px;
  width: 100%;
}

label {
  width: 45%; /* Ajuster la largeur pour les aligner à gauche */
  text-align: left; /* Alignement du texte à gauche */
}

input, textarea, select {
  width: 50%; /* Prend la place restante */
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

textarea {
  resize: none;
  height: 80px;
}

.buttons {
  display: flex;
  justify-content: space-around; /* Espacement égal entre les boutons */
  width: 100%;
  margin-top: 20px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.close-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #d32f2f;
}

.confirmation-message {
  color: green;
  margin-top: 10px;
  text-align: center;
}
</style>

  
  
  