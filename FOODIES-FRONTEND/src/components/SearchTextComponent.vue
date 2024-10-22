<script language="ts" setup>
import { ref } from 'vue';
import { useRestaurantStore } from '../stores/restaurantStore';
import { useI18n } from 'vue-i18n';


// Utilisation de `useI18n` dans le composant pour accéder à `$t`
const { t } = useI18n();


// Texte de recherche saisi par l'utilisateur
const searchText = ref('');

// Récupère l'instance du store Pinia
const restaurantStore = useRestaurantStore();

// Méthode de recherche déclenchée par le bouton ou saisie utilisateur
function performSearch() {
  console.log('Texte de recherche envoyé :', searchText.value);
  restaurantStore.updateSearchText(searchText.value); // Mise à jour du store
}
</script>

<template>
  <div class="search-bar">
    <!-- Conteneur pour le champ de saisie avec l'icône intégrée -->
    <div class="input-wrapper">
      <input 
        type="text" 
        v-model="searchText" 
        :placeholder="t('placeholder.recherche')"       
        @keyup.enter="performSearch"
      />
      <!-- Icône de recherche placée à l'intérieur du champ -->
      <button @click="performSearch" class="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <g fill="none">
            <path d="M0 0h24v24H0z"/>
            <path fill="#1a5ce0" d="M10.5 2a8.5 8.5 0 0 1 6.676 13.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 2m0 2a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 1 1 0-11"/>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.input-wrapper {
  position: relative; /* Position relative pour le conteneur */
  width: 300px; /* Largeur du champ de recherche */
}

input[type="text"] {
  width: 100%;
  padding: 10px 40px 10px 10px; /* Ajoute de l'espace pour l'icône à droite */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px; /* Bordure arrondie pour le champ */
}

.search-button {
  position: absolute; /* Position absolue pour l'icône */
  top: 50%;
  right: 10px; /* Positionner l'icône à droite du champ */
  transform: translateY(-50%); /* Centre verticalement l'icône */
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.search-button svg {
  width: 24px;
  height: 24px;
}
</style>
