

import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, reactive } from 'vue';

export const useUserStore = defineStore('userStore', () => {
  const isAuthenticated = ref(false);

  // State
  const userInfo = reactive({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    langueParlee: '',
    adresse: {
      numeroCivique: '',
      rue: '',
      ville: '',
      province: '',
      pays: '',
      codePostal: '',
    },
    adresseString: '', // Nouvelle propriété pour stocker l'adresse sous forme de chaîne
    typeDeCompte: 'Client', // Par défaut 'Client', peut être 'Propriétaire' ou 'Admin'
    servicePremium: false, // Booléen
    forfait: '', // string
    dateDebutForfait: null as Date | null,
    dateFinForfait: null as Date | null,
  });

  // Mettre à jour l'adresseString en fusionnant tous les champs d'adresse
  const updateAdresseString = () => {
    userInfo.adresseString = `${userInfo.adresse.numeroCivique} ${userInfo.adresse.rue}, ${userInfo.adresse.ville}, ${userInfo.adresse.province}, ${userInfo.adresse.pays} ${userInfo.adresse.codePostal}`;
  };

  // Action pour réinitialiser le formulaire
  const resetForm = () => {
    userInfo.nom = '';
    userInfo.prenom = '';
    userInfo.email = '';
    userInfo.password = '';
    userInfo.telephone = '';
    userInfo.adresse = {
      numeroCivique: '',
      rue: '',
      ville: '',
      province: '',
      pays: '',
      codePostal: '',
    };
    userInfo.langueParlee = '';
    userInfo.typeDeCompte = 'Client';
    userInfo.servicePremium = false;
    userInfo.forfait = '';
    userInfo.dateDebutForfait = null;
    userInfo.dateFinForfait = null;
    isAuthenticated.value = false;
  };

  // Nouvelle action pour envoyer les informations d'inscription au backend
  const registerUser = async () => {
    try {
      // Mettre à jour la chaîne d'adresse avant de créer l'objet utilisateur
      updateAdresseString();

      // Construire l'objet utilisateur avec les données actuelles du store
      const newUserInfo = {
        nom: userInfo.nom,
        prenom: userInfo.prenom,
        email: userInfo.email,
        password: userInfo.password,
        telephone: userInfo.telephone,
        adresse: userInfo.adresseString, // Utilisez la chaîne d'adresse formatée
        langueParlee: userInfo.langueParlee,
        typeDeCompte: userInfo.typeDeCompte,
        servicePremium: userInfo.servicePremium,
        forfait: userInfo.forfait,
        dateDebutForfait: userInfo.dateDebutForfait,
        dateFinForfait: userInfo.dateFinForfait,
      };

      // Log de l'objet avant l'envoi
      console.log('Objet à envoyer au backend :', newUserInfo);

      // Envoyer la requête POST vers le backend
      const response = await axios.post('http://localhost:5000/api/users/registerUser', newUserInfo);

      // Log de la réponse reçue
      console.log('Réponse reçue du backend :', response.data);

      // Afficher le succès dans la console
      console.log('Utilisateur créé avec succès :', response.data);
      alert(`${response.data.message}`);

      // Réinitialiser le formulaire après la création de l'utilisateur
      resetForm();
    } catch (error: any) {
      // Log des erreurs éventuelles
      if (error.response) {
        console.error("Erreur lors de la création de l'utilisateur :", error.response.data);
        alert(`Erreur : ${error.response.data.message}`);
        console.error("Statut de l'erreur :", error.response.status);
      } else {
        console.error("Erreur lors de la création de l'utilisateur :", error.message);
        alert(`Erreur : ${error.message}`);
      }
    }
  };

  // Action de connexion (Authentification)
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);

      console.log('Réponse reçue lors de la connexion:', response);
      const token = response.data.token;

      if (token) {
        // Stocker le token dans localStorage (mais voir l'alternative cookie)
        localStorage.setItem('userToken', token);

        // Mettre à jour les infos utilisateur
        Object.assign(userInfo, response.data);

        // Mettre à jour l'adresseString
        updateAdresseString();

        // Marquer l'utilisateur comme authentifié
        isAuthenticated.value = true;
        console.log('Utilisateur authentifié:', isAuthenticated.value);
      }
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error.message);
      throw error;
    }
  };

  // Déconnexion
  const logout = () => {
    Object.assign(userInfo, {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      telephone: '',
      langueParlee: '',
      adresse: {
        numeroCivique: '',
        rue: '',
        ville: '',
        province: '',
        pays: '',
        codePostal: '',
      },
      adresseString: '',
      typeDeCompte: 'Client',
      servicePremium: false,
      forfait: '',
      dateDebutForfait: null,
      dateFinForfait: null,
    });
    isAuthenticated.value = false;
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userData');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
    console.log('Déconnexion réussie.');
  };

  return {
    isAuthenticated,
    userInfo,
    updateAdresseString,
    resetForm,
    registerUser,
    login,
    logout,
  };
});
