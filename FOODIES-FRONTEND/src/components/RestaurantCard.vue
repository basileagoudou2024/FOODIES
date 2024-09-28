<script lang="ts">
import { defineProps } from 'vue';
import { Restaurant } from '../shared/interfaces/restaurantInterface';
import type { PropType } from 'vue';

// Définition des props avec type
defineProps<{
  restaurant: Restaurant;
}>();


export default {
  name: 'RestaurantCard', // Nom du composant Vue
  props: {
    // Propriété `restaurant` transmise au composant avec validation de type
    restaurant: {
      type: Object as PropType<Restaurant>, // Type défini par l'interface `Restaurant`
      required: true, // Propriété obligatoire pour le bon fonctionnement du composant
    },
  },
}


</script>

<template>
  <!-- Composant de carte d'affichage pour chaque restaurant -->
  <div class="card">
    <!-- Image du restaurant -->
    <img :src="restaurant.image" class="card-img-top" alt="Image du restaurant" />

    <!-- Corps de la carte avec les informations du restaurant -->
    <div class="card-body">
      <!-- Nom du restaurant affiché en tant que titre -->
      <h5 class="card-title">{{ restaurant.name }}</h5>

      <!-- Informations principales du restaurant : adresse, téléphone, type de cuisine et évaluation -->
      <p class="card-text">
        <strong>Adresse:</strong> {{ restaurant.adress }}<br /> <!-- Correction ici -->
        <strong>Téléphone:</strong> {{ restaurant.phone }}<br />
        <strong>Cuisine:</strong> {{ restaurant.cuisine }}<br />
        <strong>Évaluation:</strong> {{ restaurant.stars }} {{  }}
      </p>

      <!-- Description du restaurant -->
      <p class="card-text">
        <strong>Description:</strong> {{ restaurant.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Styles personnalisés pour la carte du restaurant */
.card {
  border: 5px solid black; /* Bordure légère autour de la carte */
  border-radius: 8px;     /* Coins arrondis */
  overflow: hidden;       /* Masquer tout débordement du contenu */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre pour donner un effet de profondeur */
  text-align:left;
}

/* Image en haut de la carte */
.card-img-top {
  width: 200px;
  height: 200px;
  margin: 15px;
  border-bottom: 1px solid white;
  border-radius: 20px;
}

/* Conteneur du corps de la carte */
.card-body {
  padding: 16px;         /* Espacement interne pour le contenu */
}

/* Style du titre de la carte (nom du restaurant) */
.card-title {
  font-size: 1.5em; 
  color:blue;     /* Taille de police agrandie */
  margin-bottom: 8px;    /* Espacement sous le titre */
}

/* Style de base pour les informations du restaurant */
.card-text {
  margin-bottom: 16px;   /* Espacement sous chaque paragraphe */
}
</style>
