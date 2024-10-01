<script lang="ts" setup>
import { ref } from 'vue';
import { useRestaurantStore } from '../stores/restaurantStore';

// Texte de recherche saisi par l'utilisateur
const searchText = ref('');

// Récupère l'instance du store Pinia
const restaurantStore = useRestaurantStore();

// Méthode de recherche déclenchée par le bouton ou saisie utilisateur
function performSearch() {
  restaurantStore.updateSearchText(searchText.value);
}
</script>

<template>
  <div class="search-bar">
    <!-- Conteneur pour le champ de saisie -->
    <div class="input-wrapper">
      <input 
        type="text" 
        v-model="searchText" 
        placeholder="Recherche"
        @keyup.enter="performSearch"
      />
    </div>

    <!-- Bouton de recherche avec icône -->
    <div class="searchIcon">
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
  align-items: center;
}

.input-wrapper {
  flex-grow: 1;
}

.searchIcon {
  margin-left: 10px;
}

.search-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.search-button img {
  width: 24px;
  height: 24px;
}
</style>
