<script setup lang="ts">
import { ref, defineProps, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { Evaluation } from '../shared/interfaces/evaluationInterface';
import { useRestaurantStore } from '../stores/restaurantStore';
import { defineEmits } from 'vue';
import { jwtDecode } from 'jwt-decode'; // Fix: Sans {}

const { t } = useI18n();
const restaurantStore = useRestaurantStore();
const emit = defineEmits(['close']);

const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
});

// Champs du formulaire
const noteProprete = ref(3);
const noteQualite = ref(3);
const noteService = ref(3);
const notePrix = ref(3);
const noteAmbiance = ref(3);
const noteEtoile = ref(3);
const commentaire = ref('');
const isSubmitting = ref(false); // État de chargement

// Obtenir l'ID utilisateur à partir du token JWT
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('userToken');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId || null;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }
  console.warn('Aucun token trouvé dans localStorage.');
  return null;
};

// Soumettre l'évaluation
const submitEvaluation = async () => {
  const userId = getUserIdFromToken();
  if (!userId) {
    console.error('Utilisateur non authentifié.');
    return;
  }

  isSubmitting.value = true;

  try {
    const evaluationData: Evaluation = {
      
      noteProprete: noteProprete.value,
      noteQualite: noteQualite.value,
      noteService: noteService.value,
      notePrix: notePrix.value,
      noteAmbiance: noteAmbiance.value,
      noteEtoile: noteEtoile.value,
      commentaire: commentaire.value,
      DateEvaluation: new Date().toISOString(),
      idRestaurant: props.restaurantId,
      idUtilisateur: userId,
    };

    console.log('Envoi des données de l’évaluation :', evaluationData);
    await restaurantStore.addEvaluation(evaluationData);

    // Réinitialiser le formulaire et fermer la modale après un court délai
    setTimeout(() => {
      resetForm();
      emit('close');
    }, 1500);
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’évaluation :', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Réinitialiser le formulaire
const resetForm = () => {
  noteProprete.value = 3;
  noteQualite.value = 3;
  noteService.value = 3;
  notePrix.value = 3;
  noteAmbiance.value = 3;
  noteEtoile.value = 3;
  commentaire.value = '';
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="emit('close')">&times;</span>
      <h2>{{ t('evaluation.Titre') }}</h2>

      <form @submit.prevent="submitEvaluation">
        <label>{{ t('evaluation.Proprete') }}</label>
        <input type="number" v-model.number="noteProprete" min="1" max="5" required />

        <label>{{ t('evaluation.Qualite') }}</label>
        <input type="number" v-model.number="noteQualite" min="1" max="5" required />

        <label>{{ t('evaluation.Service') }}</label>
        <input type="number" v-model.number="noteService" min="1" max="5" required />

        <label>{{ t('evaluation.Prix') }}</label>
        <input type="number" v-model.number="notePrix" min="1" max="5" required />

        <label>{{ t('evaluation.Ambiance') }}</label>
        <input type="number" v-model.number="noteAmbiance" min="1" max="5" required />

        <label>{{ t('evaluation.Etoile') }}</label>
        <input type="number" v-model.number="noteEtoile" min="1" max="5" required />

        <label>{{ t('evaluation.Commentaire') }}</label>
        <textarea v-model="commentaire" rows="3"></textarea>

        <button type="submit" :disabled="isSubmitting">
          <span v-if="isSubmitting">{{ t('evaluation.Envoi') }}</span>
          <span v-else>{{ t('evaluation.Envoyer') }}</span>
        </button>
      </form>
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
