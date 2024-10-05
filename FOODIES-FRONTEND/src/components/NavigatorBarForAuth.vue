<script setup lang="ts"> 
import { useNavigatorStore } from '../stores/navigatorStore';
import { storeToRefs } from 'pinia';
import LogoComponent from './LogoComponent.vue';
import SearchTextComponent from '../components/SearchTextComponent.vue';
import LocationFilter from './LocationFilter.vue';
import StarsFilter from './StarsFilter.vue';
import CuisineFilter  from "./CuisineFilter.vue";
import LanguageSelect from './LanguageSelect.vue';
import UserProfile from './UserProfile.vue';
import { ref } from 'vue';

const navigatorStore = useNavigatorStore();
const { searchText } = storeToRefs(navigatorStore); // Récupération de l'état réactif

const isMenuOpen = ref(true); // Initialisation de l'état du menu pour ordinateur

// Fonction pour basculer l'affichage du menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="navigator-bar">
    <LogoComponent class="logo" />
    <button class="mobile-menu-button" @click="toggleMenu">☰</button> <!-- Bouton pour le menu sur mobile -->
    <div class="left-section" :class="{ 'mobile-hidden': !isMenuOpen }"> <!-- Appliquer la classe mobile-hidden si le menu est masqué -->
     
      <LanguageSelect :selectedLanguage="navigatorStore.selectedLanguage" @updateLanguage="navigatorStore.updateSelectedLanguage" />
    </div>
  </div>
</template>



<style scoped>
.navigator-bar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Espace entre LogoComponent et UserProfileComponent */
  width: 100vw;
  height: 10vh;
  background-color: #bde0fe;
  padding: 0 20px;
}

.logo {
  margin-right: auto; /* Garde le logo à gauche */
  width: 120px; /* Largeur par défaut */
}

.left-section {
  display: flex;
  gap: 25px; /* Espace entre les composants */
  flex-grow: 1; /* Ce groupe prend tout l'espace disponible */
}

.user-profile {
  margin-left: 15px; /* Garde le profil utilisateur à droite */
}

/* Bouton menu pour mobile */
.mobile-menu-button {
  display: none; /* Masqué par défaut */
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-left: 10px;
}

/* Ajustements sur les écrans de petite taille */
@media (max-width: 768px) {
  .navigator-bar {
    height: auto; /* Ajuster la hauteur pour mobile */
    flex-wrap: wrap; /* Permettre aux éléments de se réorganiser */
  }

  .logo {
    width: 80px; /* Réduire la taille du logo */
  }

  /* Afficher le bouton du menu sur mobile */
  .mobile-menu-button {
    display: block; /* Affiché uniquement sur mobile */
  }

  .left-section {
    flex-direction: column; /* Empiler verticalement */
    gap: 15px; /* Réduire l'espacement */
    padding: 10px;
    width: 100%; /* Prendre toute la largeur */
  }

  /* Afficher le menu seulement quand isMenuOpen est vrai */
  .left-section.mobile-hidden {
    display: none; /* Masquer sur mobile si menu non ouvert */
  }

  /* Ajustement de la taille du champ de recherche */
  .search-input {
    width: 100%; /* Occupe toute la largeur */
  }

  .user-profile {
    margin: 0; /* Réinitialiser le margin */
  }
}
</style>
