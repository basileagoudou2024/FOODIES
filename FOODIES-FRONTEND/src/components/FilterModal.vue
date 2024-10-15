<template>
    <div>
      <button @click="isModalOpen = true" class="open-modal-button">Filtres & Tri</button>
  
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <h3>Filtres & Tri</h3>
          <button @click="isModalOpen = false" class="close-button">×</button>
  
          <!-- Section de filtres -->
          <div class="filter-item">
            <label>Rayon</label>
            <select v-model="filters.radius">
              <option value="1">1 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
            </select>
          </div>
  
          <div class="filter-item">
            <label>Étoiles</label>
            <select v-model="filters.stars">
              <option value="1">1 étoile</option>
              <option value="2">2 étoiles</option>
              <option value="3">3 étoiles</option>
              <option value="4">4 étoiles</option>
              <option value="5">5 étoiles</option>
            </select>
          </div>
  
          <div class="filter-item">
            <label>Cuisine</label>
            <select v-model="filters.cuisine">
              <option value="italienne">Italienne</option>
              <option value="asiatique">Asiatique</option>
              <option value="française">Française</option>
            </select>
          </div>
  
          <!-- Section de tri -->
          <div class="sort-item">
            <label>Tri par :</label>
            <select v-model="sortOption">
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
              <option value="distance">Distance</option>
              <option value="rating">Meilleure note</option>
            </select>
          </div>
  
          <button @click="applyFilters" class="apply-button">Appliquer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Gestion de l'état du modal
  const isModalOpen = ref(false);
  
  // Filtres sélectionnés
  const filters = ref({
    radius: '5', // Par défaut 5 km
    stars: '3',  // Par défaut 3 étoiles
    cuisine: 'italienne',
  });
  
  // Option de tri sélectionnée
  const sortOption = ref('price_asc'); // Par défaut tri par prix croissant
  
  // Fonction pour appliquer les filtres et le tri
  function applyFilters() {
    console.log('Filtres appliqués :', filters.value);
    console.log('Tri par :', sortOption.value);
  
    // Logique de filtrage et de tri à intégrer ici
    isModalOpen.value = false; // Fermer le modal après application
  }
  </script>
  
  <style scoped>
  .open-modal-button {
    background-color: #ffff;
    color: red;
    padding: 3px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    width: 300px;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
  }
  
  .filter-item,
  .sort-item {
    margin-bottom: 15px;
  }
  
  .apply-button {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
  }
  </style>
  