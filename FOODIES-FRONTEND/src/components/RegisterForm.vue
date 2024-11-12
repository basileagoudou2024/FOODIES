

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
//const form = ref<{ email: string; password: string }>({ email: '', password: '' });
const message = ref('');

// Champs de base du formulaire
const typeDeCompte = ref(userStore.userInfo.typeDeCompte);
const nom = ref(userStore.userInfo.nom);
const prenom = ref(userStore.userInfo.prenom);
const email = ref(userStore.userInfo.email);
const telephone = ref(userStore.userInfo.telephone);
const password = ref(userStore.userInfo.password);
const langueParlee = ref(userStore.userInfo.langueParlee);

// Adresse
const adresse = ref(userStore.userInfo.adresse);

// Champs pour le Service Premium
const servicePremium = ref(userStore.userInfo.servicePremium);
const forfait = ref(userStore.userInfo.forfait);
const dateDebutForfait = ref(userStore.userInfo.dateDebutForfait);
const dateFinForfait = ref(userStore.userInfo.dateFinForfait);

const validateForm = () => {
  if (!email.value || !password.value) {
    message.value = 'Email et mot de passe sont requis.';
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  // Mise à jour du store avec les données saisies
  userStore.userInfo.typeDeCompte = typeDeCompte.value;
  userStore.userInfo.nom = nom.value;
  userStore.userInfo.prenom = prenom.value;
  userStore.userInfo.email = email.value;
  userStore.userInfo.telephone = telephone.value;
  userStore.userInfo.password = password.value;
  userStore.userInfo.langueParlee = langueParlee.value;

  // Mise à jour de l'adresse
  userStore.userInfo.adresse.numeroCivique = adresse.value.numeroCivique;
  userStore.userInfo.adresse.rue = adresse.value.rue;
  userStore.userInfo.adresse.ville = adresse.value.ville;
  userStore.userInfo.adresse.province = adresse.value.province;
  userStore.userInfo.adresse.pays = adresse.value.pays;
  userStore.userInfo.adresse.codePostal = adresse.value.codePostal;

  // Si le service premium est activé, enregistrer les informations
  if (userStore.userInfo.typeDeCompte === 'Propriétaire' && userStore.userInfo.servicePremium) {
    userStore.userInfo.servicePremium = servicePremium.value;

    if (userStore.userInfo.servicePremium) { // Mettre à jour les informations de forfait si le service premium est activé
      userStore.userInfo.forfait = forfait.value;
      userStore.userInfo.dateDebutForfait = dateDebutForfait.value ? new Date(dateDebutForfait.value) : null;
      userStore.userInfo.dateFinForfait = dateFinForfait.value ? new Date(dateFinForfait.value) : null;
    } else { // Réinitialiser les champs de forfait s'il est désactivé
      userStore.userInfo.forfait = '';
      userStore.userInfo.dateDebutForfait = null;
      userStore.userInfo.dateFinForfait = null;
    }
  };

//réinitialiser les champs email et mot de passe

//userStore.resetForm();


const resetForm = () => {
  form.value = { email: '', password: '' };
  typeDeCompte.value = '';
  nom.value = '';
  prenom.value = '';
  email.value = '';
  telephone.value = '';
  password.value = '';
  langueParlee.value = '';
  adresse.value = {
    numeroCivique: '',
    rue: '',
    ville: '',
    province: '',
    pays: '',
    codePostal: ''
  };
  servicePremium.value = false;
  forfait.value = '';
  dateDebutForfait.value = null;
  dateFinForfait.value = null;
};  

const handleRegister = async () => {
  try {
    const success = await userStore.registerUser(); // Enregistrement dans le store, l'ID est sauvegardé

   // Redirection si l'inscription est réussie
   if (success && localStorage.getItem('utilisateurId')) {
      router.push({ name: 'RegisterConfirm' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
  }
}

await handleRegister();

};

</script>


<template>
  <form @submit.prevent="handleSubmit" class="create-account-form">
    <h2>Création de Compte</h2>

    <!-- Sélection du type de compte -->
    <div class="form-group">
      <label for="typeCompte">Type de compte :</label>
      <select v-model="typeDeCompte" id="typeCompte">
        <option value="Client">Client</option>
        <option value="Propriétaire">Propriétaire</option>
        <option value="Admin">Admin</option>
      </select>
    </div>

    <!-- Identification -->
    <div class="form-group">
      <label for="nom">Nom :</label>
      <input type="text" v-model="nom" id="nom" required />

      <label for="prenom">Prénom :</label>
      <input type="text" v-model="prenom" id="prenom" required />
    </div>

    <div class="form-group">
      <label for="email">Email :</label>
      <input type="email" v-model="email" id="email" required />

      <label for="telephone">Téléphone :</label>
      <input type="tel" v-model="telephone" id="telephone" />
    </div>

    <div class="form-group">
      <label for="password">Mot de passe :</label>
      <input type="password" v-model="password" id="password" required />

      <label for="langueParlee">Langue parlée :</label>
      <input type="text" v-model="langueParlee" id="langueParlee" required />
    </div>

    <!-- Adresse -->
    <h3>Adresse</h3>
    <div class="form-group">
      <label for="numeroCivique">Numéro civique :</label>
      <input type="text" v-model="adresse.numeroCivique" id="numeroCivique" />

      <label for="rue">Rue :</label>
      <input type="text" v-model="adresse.rue" id="rue" />
    </div>

    <div class="form-group">
      <label for="ville">Ville :</label>
      <input type="text" v-model="adresse.ville" id="ville" />

      <label for="province">Province :</label>
      <input type="text" v-model="adresse.province" id="province" />
    </div>

    <div class="form-group">
      <label for="pays">Pays :</label>
      <input type="text" v-model="adresse.pays" id="pays" />

      <label for="codePostal">Code Postal :</label>
      <input type="text" v-model="adresse.codePostal" id="codePostal" />
    </div>

    <!-- Service Premium pour Propriétaire -->
    <div v-if="typeDeCompte === 'Propriétaire'" class="premium-section">
      <input type="checkbox" v-model="servicePremium" id="servicePremium" />
      <label for="servicePremium">Service Premium</label>

      <div v-if="servicePremium">
        <div class="form-group">
          <label for="forfait">Forfait :</label>
          <input type="text" v-model="forfait" id="forfait" :disabled="!servicePremium" />
        </div>

        <div class="form-group">
          <label for="dateDebutForfait">Date de début du forfait :</label>
          <input type="date" v-model="dateDebutForfait" id="dateDebutForfait" :disabled="!servicePremium" />

          <label for="dateFinForfait">Date de fin du forfait :</label>
          <input type="date" v-model="dateFinForfait" id="dateFinForfait" :disabled="!servicePremium" />
        </div>
      </div>
    </div>

    <div class="button-group">

    <button type="submit">Soumettre</button>
    <button type="button" @click="userStore.resetForm()">Réinitialiser</button>

    </div>
  </form>

  
</template>



<style scoped>
.create-account-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2, h3 {
  text-align: center;
}

.form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em 0;
}

.button-group{

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10em ;
  margin-right: 5em ;
}

label {
  width: 30%;
}

input, select {
  width: 65%;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 20%;
  width: 80px;
  height: 35px;
  font-size: 13px;
  padding: 0.7em;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

.premium-section {
  margin-top: 1em;
  padding: 1em;
  border: 1px dashed #ddd;
  border-radius: 8px;
}
</style>
