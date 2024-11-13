<script setup lang="ts">
import { ref, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { Evaluation } from '../shared/interfaces/evaluationInterface';
import { useRestaurantStore } from '../stores/restaurantStore';
import { jwtDecode } from 'jwt-decode';

// Importation du store et de l'internationalisation
const { t } = useI18n();
const restaurantStore = useRestaurantStore();
const emit = defineEmits(['close', 'evaluationComplete']); // Événements d'émission

// Propriétés attendues
const props = defineProps({
  restaurantId: { type: String, required: true },
  restaurant: { type: Object as PropType<{ nom: string }>, required: true },
});

// Champs d'évaluation avec valeurs par défaut
const notes = ref({
  proprete: 1,
  qualite: 1,
  service: 1,
  prix: 1,
  ambiance: 1,
  etoile: 1,
});

const commentaire = ref('');
const isSubmitting = ref(false); // Indicateur de soumission

// Décoder l'ID utilisateur à partir du token JWT
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('userToken');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('UserId trouvé :', decodedToken.userId);
      return decodedToken.userId || null;
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
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
      ...notes.value,
      noteProprete: notes.value.proprete,
      noteQualite: notes.value.qualite,
      noteService: notes.value.service,
      notePrix: notes.value.prix,
      noteAmbiance: notes.value.ambiance,
      noteEtoile: notes.value.etoile,
      commentaire: commentaire.value,
      dateEvaluation: new Date(),
      restaurantId: props.restaurantId,
      utilisateurId: userId,
    };
    console.log('Envoi des données d’évaluation :', evaluationData);  
    await restaurantStore.addEvaluation(evaluationData);

    console.log('Évaluation envoyée avec succès');
    setTimeout(() => {
      resetForm();
      emit('evaluationComplete', evaluationData);  // Émettre l'événement avec les données d'évaluation
      emit('close');
    }, 1500);
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’évaluation :', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Réinitialisation du formulaire
const resetForm = () => {
  notes.value = {
    proprete: 1,
    qualite: 1,
    service: 1,
    prix: 1,
    ambiance: 1,
    etoile: 1,
  };
  commentaire.value = '';
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="emit('close')">&times;</span>
      <h2>{{ restaurant.nom }}</h2>

      <form @submit.prevent="submitEvaluation">
        <div v-for="(note, key) in notes" :key="key" class="form-group">
          <label :for="key">{{ t(`evaluation.${key}`) }}</label>
          <input
            :id="key"
            type="number"
            v-model.number="notes[key]"
            min="1"
            max="5"
            required
          />
        </div>

        <label for="commentaire">{{ t('evaluation.Commentaire') }}</label>
        <textarea
          id="commentaire"
          v-model="commentaire"
          rows="3"
          placeholder="Ajouter un commentaire..."
        ></textarea>

        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">{{ t('evaluation.En cours...') }}</span>
          <span v-else>{{ t('evaluation.Envoyer') }}</span>
        </button>
      </form>

      <button class="close-button" @click="emit('close')">
        {{ t('evaluation.Fermer') }}
      </button>
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
