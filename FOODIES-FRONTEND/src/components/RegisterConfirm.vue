


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const userCodeInput = ref<number | null>(null);
const errorMessage = ref<string | null>(null);
const alertVisible = ref(false);
const alertAutoClose = ref(false);
const isResendDisabled = ref(true);
const isConfirmDisabled = ref(false);
const attempts = ref(0);
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null;

// Log statement to verify component mounting
onMounted(() => {
  console.log('RegisterConfirm component mounted');
});

// Fonction pour fermer complètement le composant
const closeComponent = () => {
  userStore.redirectToLoginPage();
};


// Fonction de validation du code de confirmation
const handleConfirmCode = async () => {
  errorMessage.value = null;
  alertVisible.value = false;

  if (userCodeInput.value === null) {
    errorMessage.value = "Veuillez entrer un code de confirmation.";
    showAlert();
    return;
  }

  try {
    await userStore.validateConfirmationCode(userCodeInput.value);
    localStorage.removeItem('utilisateurId'); // Supprimer l'ID après la validation réussie
    userStore.redirectToRestaurantsPage(); // Redirection vers la page Restaurants
  } catch (error: any) {
    if (error.message === "Code de confirmation expiré.") {
      isResendDisabled.value = true; // désactiver le bouton jusqu'à fermeture de l'alerte
      alertAutoClose.value = true; // Activer le compteur pour fermeture automatique
      showAlert();
      startAutoCloseAlert();
    } else {
      errorMessage.value = error.message;
      showAlert();
    }

    // Compter les tentatives incorrectes
    attempts.value++;
    if (attempts.value >= 5) {
      errorMessage.value = "Code de confirmation expiré.";
      alertAutoClose.value = true;
      isConfirmDisabled.value = true; // Désactiver le bouton "Confirmer"
      startAutoCloseAlert(() => {
        userStore.redirectToLoginPage(); // Redirection après fermeture
      });
    }
  }
};

// Afficher l'alerte d'erreur
const showAlert = () => {
  alertVisible.value = true;
  isResendDisabled.value = true;
};

// Fermer l'alerte d'erreur
const closeAlert = () => {
  alertVisible.value = false;
  errorMessage.value = null;
  alertAutoClose.value = false;
  isResendDisabled.value = false; // Activer le bouton "Nouveau code"
  if (autoCloseTimer !== null) {  // Annuler le timer si nécessaire
  clearTimeout(autoCloseTimer);
} 
};

// Timer pour la fermeture automatique de l'alerte après 5 secondes
const startAutoCloseAlert = (callback?: () => void) => {
  autoCloseTimer = setTimeout(() => {
    closeAlert();
    if (callback) callback(); // Exécuter une action après fermeture
  }, 5000);
};

// Fonction de renvoi d'un nouveau code
const handleResendCode = async () => {
  isResendDisabled.value = true;
  errorMessage.value = null;

  try {
    await userStore.fetchConfirmationCode();
    errorMessage.value = "Un nouveau code a été envoyé.";
    showAlert();
  } catch (error: any) {
    errorMessage.value = error.message;
    showAlert();
  }
};
</script>

<template>
  <div class="modal">
    <button @click="closeComponent" class="close-component">🞩</button> <!-- Nouvelle icône de fermeture pour le composant -->
    <h2>Confirmation d'inscription</h2>
    <p>Veuillez entrer le code de confirmation envoyé par courriel.</p>

    <input
      type="number"
      v-model="userCodeInput"
      placeholder="Code de confirmation"
      :disabled="isConfirmDisabled"
    />
    <button @click="handleConfirmCode" :disabled="isConfirmDisabled" class="button">Confirmer</button>
    <button @click="handleResendCode" :disabled="isResendDisabled" class="button">Nouveau code</button>

    <!-- Alerte avec possibilité de fermeture et compteur pour expiration -->
    <div v-if="alertVisible" class="alert">
      <p>{{ errorMessage }}</p>
      <button @click="closeAlert" class="close-alert">✖️</button>
      <span v-if="alertAutoClose" class="auto-close-timer">Fermeture automatique dans 5 secondes</span>
    </div>
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
  gap: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-height: 70%;
  max-width: 400px;
  background-color: #dee2e6;
  padding: 50px;
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

.button {
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

.button:hover {
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

.close-component {
  background: none;
  border: none;
  font-size: 1em;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}


/* Styles des alertes */

.alert {
  border: 1px solid red;
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  position: relative;
  margin-top: 10px;
}
.close-alert {
  background : none;
  border: none;
  font-size: 0.8em;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
.auto-close-timer {
  font-size: 0.9em;
  color: #721c24;
  display: block;
  margin-top: 5px;
}
</style>
