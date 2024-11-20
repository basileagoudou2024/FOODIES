<script setup lang="ts">
import { useNavigatorStore } from '../stores/navigatorStore';
import LogoComponent from './LogoComponent.vue';
import LanguageSelect from './LanguageSelect.vue';
import ConnexionButton from './ConnexionButton.vue';
const navigatorStore = useNavigatorStore();
import { useRouter } from 'vue-router';

const router = useRouter(); // Initialiser le routeur

const goToLogin = () => {
  router.push({ name: 'Login' }); // Redirige vers la page de connexion
};
</script>

<template>
  <div class="navigator-bar">
    <LogoComponent class="logo" />
    <ConnexionButton @click="goToLogin" class="buttonConnect"/>
    <div class="left-section">
      <LanguageSelect :selectedLanguage="navigatorStore.selectedLanguage" @updateLanguage="navigatorStore.updateSelectedLanguage" />
    </div>
  </div>
</template>

<style scoped>
.navigator-bar {
  display: flex;
  flex-direction: row;
  gap: 35em;
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

/* Ajustements sur les écrans de petite taille */
@media (max-width: 768px) {
  .navigator-bar {
    height: auto; /* Ajuster la hauteur pour mobile */
    flex-wrap: wrap; /* Permettre aux éléments de se réorganiser */
  }

  .logo {
    width: 80px; /* Réduire la taille du logo */
  }

  .left-section {
    flex-direction: column; /* Empiler verticalement */
    gap: 15px; /* Réduire l'espacement */
    padding: 10px;
    width: 100%; /* Prendre toute la largeur */
  }

  /* Ajustement de la taille du champ de recherche */
  .search-input {
    width: 100%; /* Occupe toute la largeur */
  }

  .user-profile {
    margin: 0; /* Réinitialiser le margin */
  }
}


/* Media Queries pour les différents appareils */
@media (max-width: 456px), (max-width: 412px), (max-width: 390px), (max-width: 360px) {
  .navigator-bar {
    flex-direction: column;
    align-items: center;
    /*justify-content: space-between;*/
    column-gap: 2px;
    padding: 10px;
    padding-right:70px;
    height: 20vh; /* Ajuster la hauteur pour mobile */
  }

  .logo {
    margin-bottom: 10px; /* Ajouter un espace sous le logo */
  }

  .buttonConnect,
  .left-section {
    margin-bottom: 10px; /* Ajouter un espace entre les éléments */
  }

  .left-section {
    flex-direction: column;
    align-items: center;
    gap: 10px; /* Réduire l'espacement entre les éléments */
  }
}


/* Media Queries pour les différents appareils */
@media (min-width: 1323px) {
  .navigator-bar {
    gap: 30em;
  
  }
}
</style>
