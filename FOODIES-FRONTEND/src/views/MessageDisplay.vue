<script lang="ts">
</script>

<template>
  <div class="scrolling-text-container">
    <!-- Le texte est dupliqué deux fois -->
    <div class="scrolling-text">
      <span>Bienvenu sur Foodie's, la plateforme N°1 de réservation de restaurant en ligne! </span>
      <span>Bienvenu sur Foodie's, la plateforme N°1 de réservation de restaurant en ligne! </span>
      <span>Bienvenu sur Foodie's, la plateforme N°1 de réservation de restaurant en ligne! </span>
    </div>
  </div>
</template>

<style scoped>
.scrolling-text-container {
  width: 100%; /* La largeur du conteneur prend tout l'écran */
  overflow: hidden; /* Masquer le texte qui déborde pour l'effet de défilement */
  background-color: #f7f7f7; /* Couleur de fond si nécessaire */
  padding: 10px 0;
}

.scrolling-text {
  display: inline-flex; /* Utiliser flexbox pour afficher les deux textes en ligne */
  white-space: nowrap; /* Empêche le texte de se casser en plusieurs lignes */
  animation: scroll-text 25s linear infinite; /* Animation continue */
  color:green;
  font-weight: bold;
}

.scrolling-text span {
  padding-right: 100px; /* Espace entre les deux textes si nécessaire */
}

@keyframes scroll-text {
  0% {
    transform: translateX(-100%); /* Le texte commence à gauche */
  }
  100% {
    transform: translateX(100%); /* Le texte se déplace complètement vers la droite */
  }
}
</style>
