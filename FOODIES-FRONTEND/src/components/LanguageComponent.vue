<script lang="ts" setup>
import { ref } from 'vue';

// Variable réactive pour la langue sélectionnée, initialisée à "FR"
const selectedLanguage = ref('FR');

// Fonction pour changer la langue
const changeLanguage = (lang: string) => {
  selectedLanguage.value = lang;
  console.log('Langue changée en :', lang);
};
</script>

<template>
  <!-- Sélecteur de langue -->
  <div class="nav-item dropdown">
    <!-- Icône langue -->
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <g fill="none" stroke="#fb1d04" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
        <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2S2 6.477 2 12"/>
        <path d="M13 2.05S16 6 16 12s-3 9.95-3 9.95m-2 0S8 18 8 12s3-9.95 3-9.95M2.63 15.5h18.74m-18.74-7h18.74"/>
      </g>
    </svg>

    <!-- Affichage de la langue sélectionnée -->
    <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Langue : {{ selectedLanguage }}
    </a>

    <!-- Menu déroulant pour choisir la langue -->
    <ul class="dropdown-menu" aria-labelledby="languageDropdown">
      <li>
        <a class="dropdown-item" href="#" @click="changeLanguage('EN')">EN</a>
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="changeLanguage('FR')">FR</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.nav-item {
  text-align: center; /* Centre horizontalement le contenu */
}

svg {
  display: inline-block; /* S'assure que l'élément SVG est traité comme un élément en ligne pour le centrage */
}
</style>

