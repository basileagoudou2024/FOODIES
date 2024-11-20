<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

// Initialiser les champs avec ref() pour suivre les valeurs
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const login = async () => {
  try {
    await userStore.login({ email: email.value, password: password.value });
  } catch (error: any) {
    console.error("Erreur lors de la connexion :", error.message);
    errorMessage.value = error.message || "Échec de la connexion.";
  }
};

const goToCreateAccount = () => {
  router.push('/register');
  console.log("Redirection vers la page de création de compte...");
};
</script>

<template>
  <div class="auth-form">
    <div class="form-container">
      <h3>Connexion à Foodies</h3>

      <div class="form-group">
        <input v-model="email" type="email" placeholder="Courriel" required />
      </div>

      <div class="form-group">
        <input v-model="password" type="password" placeholder="Mot de passe" required />
      </div>

      <div class="button-group">
        <button @click="login">Connexion</button>
      </div>

      <div class="links">
        <a href="#">Mot de passe oublié?</a>
        <p>Pas encore inscrit?</p>
      </div>

      <div class="button-group">
        <button @click="goToCreateAccount">Créer compte</button>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.auth-form {
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

.form-group {
  margin-bottom: 15px;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: space-between;
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

button:hover {
  background-color: #218838;
}

.links {
  text-align: center;
}

.links a {
  color: #007bff;
  text-decoration: none;
  margin: 5px;
}

.links a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  text-align: center;
}

/* Media Queries pour les différents appareils */
@media (max-width: 456px) {
  .form-container {
    width: 80vw;
  }

  .form-group {
  margin-bottom: 40px;
}
}

@media (max-width: 412px) {
  .form-container {
    width: 85vw;
  }
}

@media (max-width: 395px) {
  .form-container {
    width: 90vw;
  }
}

@media (max-width: 360px) {
  .form-container {
    width: 95vw;
  }
}
</style>
