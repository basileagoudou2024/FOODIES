// stores/navigatorStore.ts
import { defineStore } from 'pinia';

interface NavigatorState {
  searchQuery: string;
  selectedLocation: string;
  selectedStars: string;
  selectedKitchen: string;
  selectedLanguage: string;
}

export const useNavigatorStore = defineStore('navigator', {
  state: (): NavigatorState => ({
    searchQuery: '',
    selectedLocation:'',
    selectedStars:'',
    selectedKitchen: '',
    selectedLanguage: 'fr', // langue par défaut
  }),
  getters: {
    // Ajoutez des getters si nécessaire
    getSearchQuery(state: NavigatorState) {
      return state.searchQuery;
    },
    getSelectedLocation(state: NavigatorState) {
      return state.selectedLocation;
    },
    getSelectedStars(state: NavigatorState) {
      return state.selectedStars;
    },
    getSelectedKitchen(state: NavigatorState) {
      return state.selectedKitchen;
    },
    getSelectedLanguage(state: NavigatorState) {
      return state.selectedLanguage;
    },
  },
  actions: {
    // Ajoutez des actions pour modifier l'état
    updateSearchQuery(query: string) {
      this.searchQuery = query;
    },
    updateSelectedLocation(location: string) {
      this.selectedLocation = location;
    },
    updateSelectedStars(stars: string) {
      this.selectedStars = stars;
    },
    updateSelectedKitchen(kitchen: string) {
      this.selectedKitchen = kitchen;
    },
    updateSelectedLanguage(language: string) {
      this.selectedLanguage = language;
    },
  },
});
