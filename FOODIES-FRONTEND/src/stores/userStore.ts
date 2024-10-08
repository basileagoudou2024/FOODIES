import { defineStore } from 'pinia';
import axios from 'axios';
import { User } from '../shared/interfaces/userInterface'; // Importe le type User

interface UserState {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    users: [], // Stocke la liste des utilisateurs
    currentUser: null, // Utilisateur actuellement connecté
    isAuthenticated: false, // Indique si l'utilisateur est authentifié ou non
  }),

  actions: {
    // Action de création de compte
    async createAccount(user: User) {
      try {
        // Envoie les données de l'utilisateur au backend
        const response = await axios.post('http://localhost:5000/api/users', user);

        // Une fois l'utilisateur créé avec succès, on envoie un email de confirmation
        await axios.post('http://localhost:5000/api/send-confirmation-email', {
          email: user.email,
          password: user.password,
          type: user.type,
        });

        console.log('User account created and confirmation email sent.');
        return response.data; // Retourne les données de l'utilisateur créé
      } catch (error) {
        console.error('Erreur lors de la création du compte:', error);
        throw error;
      }
    },

    // Action de connexion avec vérification du type
    login({ email, password }: { email: string; password: string }) {
      if (!email || !password) {
        console.error('Email and password are required');
        return;
      }

      const user = this.users.find((u) => u.email === email && u.password === password);
      if (user) {
        this.currentUser = user;
        this.isAuthenticated = true; // L'utilisateur est connecté
      } else {
        throw new Error('Invalid login credentials');
      }
    },

    // Action de déconnexion
    logout() {
      this.isAuthenticated = false; // Met à jour l'état de l'authentification
      this.currentUser = null; // Réinitialise l'utilisateur courant
    },
  },
});
