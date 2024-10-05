<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import type { UserType } from '../shared/interfaces/userInterface';

// Utilisation du store et du router
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// Champs du formulaire
const email = ref('');
const password = ref('');
const accountType = ref<UserType | ''>('');

// Tableau dynamique des types de compte
const accountTypes = ['client', 'propriétaire', 'admin'];

// Variables de gestion des erreurs
const emailError = ref('');
const passwordError = ref('');
const serverError = ref(''); // Erreur de création de compte côté serveur

// Validation des champs
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !email.value.match(emailRegex) ? 'Veuillez entrer un email valide.' : '';
};

const validatePassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  passwordError.value = !password.value.match(passwordRegex)
    ? 'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.'
    : '';
};

// Détection de validité globale du formulaire
const formIsValid = computed(() => {
  return emailError.value === '' && passwordError.value === '' && email.value !== '' && password.value !== '';
});

// Gestion du type de compte lors du chargement
onMounted(() => {
  if (route.query.type) {
    accountType.value = route.query.type.toString() as UserType;
  }
});

// Gestion de l'envoi du formulaire
const handleSubmit = () => {
  if (formIsValid.value) {
    serverError.value = ''; // Réinitialisation de l'erreur serveur
    // Appel au store pour créer le compte
    authStore
      .createAccount({
        email: email.value,
        password: password.value,
        type: accountType.value as UserType,
      })
      .then(() => {
        alert(`Compte créé pour : ${email.value}`);
        router.push('/restaurants');
      })
      .catch((error) => {
        serverError.value = 'Erreur lors de la création du compte. Veuillez réessayer.';
        console.error('Erreur lors de la création du compte :', error);
      });
  } else {
    alert('Veuillez remplir le formulaire correctement.');
  }
};
</script>

<template>
  <div>
    <div class="container">
      <div class="form-container">
        <h4>Créer un Compte</h4>
        <form @submit.prevent="handleSubmit">
          <!-- Type de compte -->
          <div class="account-type">
            <label for="account-type">Type de compte :</label>
            <select id="account-type" v-model="accountType" required>
              <option v-for="type in accountTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <!-- Champ Email -->
          <div class="form-group">
            <label for="email">Courriel</label>
            <input
              id="email"
              v-model="email"
              type="email"
              @input="validateEmail"
              :class="{ 'is-invalid': emailError }"
              placeholder="Couriel"
              aria-describedby="emailHelp"
              required
            />
            <span id="emailHelp" v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>

          <!-- Champ Mot de Passe -->
          <div class="form-group">
            <label for="password">Mot de Passe</label>
            <input
              id="password"
              v-model="password"
              type="password"
              @input="validatePassword"
              :class="{ 'is-invalid': passwordError }"
              placeholder="Mot de Passe"
              aria-describedby="passwordHelp"
              required
            />
            <span id="passwordHelp" v-if="passwordError" class="error-message">{{ passwordError }}</span>
          </div>

          <!-- Message d'erreur serveur -->
          <span v-if="serverError" class="error-message">{{ serverError }}</span>

          <!-- Bouton de soumission -->
          <div class="button">
            <button type="submit" :disabled="!formIsValid">Soumettre</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100vw;
  background-color: #f4f4f4;
}

.form-container {
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}

button[disabled] {
  background: #ddd;
  cursor: not-allowed;
}

.is-invalid {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

.account-type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
