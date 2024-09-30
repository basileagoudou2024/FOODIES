<script setup lang="ts">
import { useNavigatorStore } from '../stores/navigatorStore';
import { storeToRefs } from 'pinia';
import LogoComponent from '../components/LogoComponent.vue';
import SearchTextComponent from '../components/SearchTextComponent.vue';
import LocationFilterComponent from '../components/LocationFilter.vue';
import StarsFilterComponent from '../components/StarsFilterComponent.vue';
import KitchenFilterComponent from "../components/CuisineFilter.vue";
import LanguageComponent from '../components/LanguageSelect.vue';
import UserProfileComponent from "../components/UserProfileComponent.vue";

const navigatorStore = useNavigatorStore();
const { searchQuery } = storeToRefs(navigatorStore); // Récupération de l'état réactif

// Vous pouvez appeler des actions ici si nécessaire
</script>

<template>
  <div class="navigator-bar">
    <LogoComponent class="logo" />
    <div class="left-section">
      <SearchTextComponent :query="searchQuery" @updateQuery="navigatorStore.updateSearchQuery" />
      <LocationFilterComponent :selectedLocation="navigatorStore.selectedLocation" @updateLocation="navigatorStore.updateSelectedLocation" />
      <StarsFilterComponent :selectedStars="navigatorStore.selectedStars" @updateStars="navigatorStore.updateSelectedStars" />
      <KitchenFilterComponent :selectedKitchen="navigatorStore.selectedKitchen" @updateKitchen="navigatorStore.updateSelectedKitchen" />
      <LanguageComponent :selectedLanguage="navigatorStore.selectedLanguage" @updateLanguage="navigatorStore.updateSelectedLanguage" />
    </div>
    <UserProfileComponent class="user-profile" />
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
}

.left-section {
  display: flex;
  gap: 25px; /* Espace entre les composants */
  flex-grow: 1; /* Ce groupe prend tout l'espace disponible */
}

.user-profile {
  margin-left: 15px; /* Garde le profil utilisateur à droite */
}
</style>
