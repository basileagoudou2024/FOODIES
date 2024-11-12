<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const userCodeInput = ref<number | null>(null);
const errorMessage = ref<string | null>(null);
const isResendDisabled = ref(true); // Désactivé par défaut

// Log statement to verify component mounting
onMounted(() => {
  console.log('RegisterConfirm component mounted');
});

// Fonction de validation du code de confirmation
const handleConfirmCode = async () => {
  errorMessage.value = null;

  if (userCodeInput.value === null) {
    errorMessage.value = "Veuillez entrer un code de confirmation.";
    return;
  }

  try {
    await userStore.validateConfirmationCode(userCodeInput.value);
    localStorage.removeItem('utilisateurId'); // Supprimer l'ID après la validation réussie
    userStore.redirectToRestaurantsPage(); // Redirection vers la page Restaurants
  } catch (error: any) {
    // Si le code est expiré, active le bouton "Nouveau code"
    if (error.message === "Code de confirmation expiré.") {
      isResendDisabled.value = false;
    }
    errorMessage.value = error.message;
  }
};

// Fonction de renvoi d'un nouveau code
const handleResendCode = async () => {
  isResendDisabled.value = true;
  errorMessage.value = null;

  try {
    await userStore.fetchConfirmationCode();
    errorMessage.value = "Un nouveau code a été envoyé.";
  } catch (error: any) {
    errorMessage.value = error.message;
  }
};
</script>


<template>
  <div class="modal">
    <h2>Confirmation d'inscription</h2>
    <p>Veuillez entrer le code de confirmation envoyé par courriel.</p>
    <input
      type="number"
      v-model="userCodeInput"
      placeholder="Code de confirmation"
    />
    <button @click="handleConfirmCode">Confirmer</button>
    <button @click="handleResendCode" :disabled="isResendDisabled">Nouveau code</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
/* Styles de la modale */
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-height: 70%;
  max-width: 400px;
  background-color: #dee2e6;
  padding: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

}

.modal h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #0466c8;
  text-align: center;
}

.modal p {
  margin-bottom: 15px;
  color: #555;
  text-align: center;
}

.modal input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 1em;
}

.modal button {
  width: 70%;
  padding: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.modal button:hover {
  background-color: #90a955;
}

.modal button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>
