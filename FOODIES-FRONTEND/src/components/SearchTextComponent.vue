<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');

const performSearch = () => {
  // Logique de la recherche ou action à déclencher lorsque l'icône est cliquée
  console.log(`Searching for: ${searchQuery.value}`);
};
</script>



<template>
  <div class="search-bar">
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for restaurant, kitchen, etc."
        class="search-input"
      />
      <span class="search-icon" @click="performSearch">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <g fill="none">
            <path d="M0 0h24v24H0z"/>
            <path fill="#1a5ce0" d="M10.5 2a8.5 8.5 0 0 1 6.676 13.762l3.652 3.652a1 1 0 0 1-1.414 1.414l-3.652-3.652A8.5 8.5 0 1 1 10.5 
            2m0 2a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13m0 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"/>
          </g>
        </svg>
      </span>
    </div>
  </div>
</template>


<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.search-container {
  position: relative;
  width: 100%; /* Augmenter la largeur à 1.5 fois */
  max-width: 400px; /* Limiter la largeur maximale pour les grands écrans */
}

.search-input {
  width: 100%; /* L'entrée s'étend à la largeur du conteneur */
  padding: 10px 40px 10px 15px; /* Padding à droite pour l'icône */
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer; /* Ajout d'un curseur pointer pour indiquer que c'est cliquable */
}

.search-icon svg {
  width: 1.5em;
  height: 1.5em;
}

</style>
