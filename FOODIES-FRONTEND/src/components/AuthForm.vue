
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();

// champs du formulaire 
  
const email = ref('');
const password = ref('');
const errorMessage = ref('');  // renvoi de message d'erreur
  
const authStore = useAuthStore();
  
const login = async () => {
    try {
      await authStore.login({ email: email.value, password: password.value});
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = 'Login failed. Please check your credentials.';
    }
  };

  const goToCreateAccount = () => {
  // Transmet le type de compte à la page de création
  router.push('/register');

  console.log('Redirecting to create account page...');
};
  

  </script>



<template>
  
    <div class="auth-form">
      <div class="form-container">
        <h3>Connexion à Foodies</h3>
        
        <!-- Sélecteur de type de compte -->
       
        <!-- Champs de saisie pour l'email et le mot de passe -->
        <div class="form-group">
          <input    v-model="email"    type="email"      placeholder="Courriel"     required  />
        </div>

        <div class="form-group">
          <input   v-model="password"   type="password"   placeholder="Mot de passe"   required/>
        </div>
  
        <!-- Boutons de soumission -->
        <div class="button-group">
          <button @click="login">Connexion</button>
        </div>
  
        <!-- Liens pour récupérer le mot de passe ou créer un nouveau compte -->
        <div class="links">
          <a href="#">Mot de passe oublié?</a>
          <p> Pas encore inscrit?</p>
        </div>
        <div class="button-group">
          <button @click="goToCreateAccount">Créer compte</button>
        </div>
  
        <!-- Message d'erreur -->
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
  </style>
  