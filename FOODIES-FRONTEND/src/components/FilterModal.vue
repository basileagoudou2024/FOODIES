
<script setup lang="ts">
import { ref } from 'vue';
import { useRestaurantStore } from '../stores/restaurantStore';

const isModalOpen = ref(false);
const restaurantStore = useRestaurantStore();

const selectedCuisine = ref('');
const minStars = ref(0);
const sortOption = ref('alphabetical');

function applyFilters() {
  restaurantStore.setCuisine(selectedCuisine.value);
  restaurantStore.minStars = minStars.value;
  restaurantStore.setSortOption(sortOption.value);
  isModalOpen.value = false;
}
</script>


<template>
  <div>
    <button @click="isModalOpen = true" class="open-modal-button">Filtres & Tri</button>

    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>Filtres & Tri</h3>
        <button @click="isModalOpen = false" class="close-button">×</button>

        <div class="filter-item">
          <label>Étoiles</label>
          <select v-model.number="minStars">
            <option value="0">Aucune</option>
            <option value="1">1 étoile</option>
            <option value="2">2 étoiles</option>
            <option value="3">3 étoiles</option>
            <option value="4">4 étoiles</option>
            <option value="5">5 étoiles</option>
          </select>
        </div>

        <div class="filter-item">
          <label>Cuisine</label>
          <select v-model="selectedCuisine">
            <option value="">Toutes</option>
            <option value="italienne">Italienne</option>
            <option value="asiatique">Asiatique</option>
            <option value="française">Française</option>
          </select>
        </div>

        <div class="sort-item">
          <label>Tri par :</label>
          <select v-model="sortOption">
            <option value="alphabetical">Alphabétique (A-Z)</option>
            <option value="alphabetical_desc">Alphabétique (Z-A)</option>
            <option value="rating">Évaluation décroissante</option>
            <option value="rating_desc">Évaluation croissante</option>
          </select>
        </div>

        <button @click="applyFilters" class="apply-button">Appliquer</button>
      </div>
    </div>
  </div>
</template>

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
  