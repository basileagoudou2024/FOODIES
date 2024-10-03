// gestion de l'authentification

import { defineStore } from 'pinia';

type UserType = 'client' | 'employee' | 'owner' | 'admin';


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userType: 'client', // 'client', 'employee', 'owner', or 'admin'
    isAuthenticated: false,
    userData: {},
  }),

  actions: {
    login(email:string, password: string) {

        if (!email || !password) {
            console.error('Email and password are required');
            return;
        }
      // En fonction du userType, appel à l'API pour le login
      if (this.userType === 'client') {
        // Logique d'authentification client
      } else if (this.userType === 'owner') {
        // Logique pour owner
      } else if (this.userType === 'employee') {
        // Authentification employé
      } else if (this.userType === 'admin') {
        // Authentification admin
      }
      this.isAuthenticated = true;
    },

    logout() {
      this.isAuthenticated = false;
      this.userData = {};
    },

    setUserType(type: UserType) {
      this.userType = type;
    },
  },
});
