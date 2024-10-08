

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/userStore';


const authStore = useAuthStore();

// Champs de base du formulaire
const typeDeCompte = ref(authStore.typeDeCompte);
const nom = ref(authStore.nom);
const prenom = ref(authStore.prenom);
const email = ref(authStore.email);
const telephone = ref(authStore.telephone);
const password = ref(authStore.password);
const langueParlee = ref(authStore.langueParlee);

// Adresse
const adresse = ref({
  numeroCivique: '',
  rue: '',
  ville: '',
  province: '',
  pays: '',
  codePostal: '',
});

// Champs pour le Service Premium
const servicePremium = ref(false);
const forfait = ref('');
const dateDebutForfait = ref('');
const dateFinForfait = ref('');

const handleSubmit = async () => {
  // Mise à jour du store avec les données saisies
  authStore.typeDeCompte = typeDeCompte.value;
  authStore.nom = nom.value;
  authStore.prenom = prenom.value;
  authStore.email = email.value;
  authStore.telephone = telephone.value;
  authStore.password = password.value;
  authStore.langueParlee = langueParlee.value;  

  // Mise à jour de l'adresse
  authStore.adresse.numeroCivique = adresse.value.numeroCivique;
  authStore.adresse.rue = adresse.value.rue;
  authStore.adresse.ville = adresse.value.ville;
  authStore.adresse.province = adresse.value.province;
  authStore.adresse.pays = adresse.value.pays;
  authStore.adresse.codePostal = adresse.value.codePostal;

  // Si le service premium est activé, enregistrer les informations
  if (typeDeCompte.value === 'Propriétaire' && servicePremium.value) {
    
 // Mise à jour du service Premium et des informations associées
  authStore.servicePremium = servicePremium.value;

  if (authStore.servicePremium) { // Mettre à jour les informations de forfait si le service premium est activé
    authStore.forfait = forfait.value;
    authStore.dateDebutForfait = dateDebutForfait.value ? new Date(dateDebutForfait.value) : null;
    authStore.dateFinForfait = dateFinForfait.value ? new Date(dateFinForfait.value) : null;
  } else { // Réinitialiser les champs de forfait s'il est désactivé
    authStore.forfait = '';
    authStore.dateDebutForfait = null;
    authStore.dateFinForfait = null;
  }
  }

  // Appel de la fonction d'enregistrement
  authStore.registerUser();
  
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

      <label for="langueParlee"> langue parlée :</label>
      <input type="password" v-model="langueParlee" id="langueParlee" required />
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

    <button type="submit">Soumettre</button>
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
  padding: 0.7em;
  background-color:  #28a745;
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
  border: 1px dashed #007bff;
}
</style>















<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';


const authStore = useAuthStore();

// Champs de base du formulaire
const typeDeCompte = ref(authStore.typeDeCompte);
const nom = ref(authStore.nom);
const prenom = ref(authStore.prenom);
const email = ref(authStore.email);
const telephone = ref(authStore.telephone);
const password = ref(authStore.password);
const langueParlee = ref(authStore.langueParlee);

// Adresse
const adresse = ref({
  numeroCivique: '',
  rue: '',
  ville: '',
  province: '',
  pays: '',
  codePostal: '',
});

// Champs pour le Service Premium
const servicePremium = ref(false);
const forfait = ref('');
const dateDebutForfait = ref('');
const dateFinForfait = ref('');

const handleSubmit = async () => {
  // Mise à jour du store avec les données saisies
  authStore.typeDeCompte = typeDeCompte.value;
  authStore.nom = nom.value;
  authStore.prenom = prenom.value;
  authStore.email = email.value;
  authStore.telephone = telephone.value;
  authStore.password = password.value;
  authStore.langueParlee = langueParlee.value;  

  // Mise à jour de l'adresse
  authStore.adresse.numeroCivique = adresse.value.numeroCivique;
  authStore.adresse.rue = adresse.value.rue;
  authStore.adresse.ville = adresse.value.ville;
  authStore.adresse.province = adresse.value.province;
  authStore.adresse.pays = adresse.value.pays;
  authStore.adresse.codePostal = adresse.value.codePostal;

  // Si le service premium est activé, enregistrer les informations
  if (typeDeCompte.value === 'Propriétaire' && servicePremium.value) {
    
 // Mise à jour du service Premium et des informations associées
  authStore.servicePremium = servicePremium.value;

  if (authStore.servicePremium) { // Mettre à jour les informations de forfait si le service premium est activé
    authStore.forfait = forfait.value;
    authStore.dateDebutForfait = dateDebutForfait.value ? new Date(dateDebutForfait.value) : null;
    authStore.dateFinForfait = dateFinForfait.value ? new Date(dateFinForfait.value) : null;
  } else { // Réinitialiser les champs de forfait s'il est désactivé
    authStore.forfait = '';
    authStore.dateDebutForfait = null;
    authStore.dateFinForfait = null;
  }
  }

  // Appel de la fonction d'enregistrement
  authStore.registerUser();
  
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

      <label for="langueParlee"> langue parlée :</label>
      <input type="password" v-model="langueParlee" id="langueParlee" required />
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

    <button type="submit">Soumettre</button>
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
  padding: 0.7em;
  background-color:  #28a745;
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
  border: 1px dashed #007bff;
}
</style>
