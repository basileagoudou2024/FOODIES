import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
    adresseString: '', // Nouvelle propriété pour stocker l'adresse sous forme de chaîne
    langueParlee:'',
    adresse: {
      numeroCivique: '',
      rue: '',
      ville: '',
      province: '',
      pays: '',
      codePostal: '',
    },
    typeDeCompte: 'Client', // Par défaut 'Client', peut être 'Propriétaire' ou 'Admin'
    servicePremium: false, // Booléen
    forfait: '', // string
    dateDebutForfait: null as Date | null,
    dateFinForfait: null as Date | null,
    isAuthenticated: false, // Indicateur d'authentification
  
  }),

  actions: {
    // Mettre à jour l'adresseString en fusionnant tous les champs d'adresse
    updateAdresseString() {
      this.adresseString = `${this.adresse.numeroCivique} ${this.adresse.rue}, ${this.adresse.ville}, ${this.adresse.province}, ${this.adresse.pays} ${this.adresse.codePostal}`;
    },

    // Action pour réinitialiser le formulaire
    resetForm() {
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.password = '';
      this.telephone = '';
      this.adresse = {
        numeroCivique: '',
        rue: '',
        ville: '',
        province: '',
        pays: '',
        codePostal: '',
      };
      this.langueParlee = '';
      this.typeDeCompte = 'Client';
      this.servicePremium = false;
      this.forfait = '';
      this.dateDebutForfait = null;
      this.dateFinForfait = null;
      this.isAuthenticated = false;
    
    },

    // Nouvelle action pour envoyer les informations d'inscription au backend
    async registerUser() {
      try {
        // Mettre à jour la chaîne d'adresse avant de créer l'objet utilisateur
        this.updateAdresseString();
        
        // Construire l'objet utilisateur avec les données actuelles du store
        const newUser = {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password,
          telephone: this.telephone,
          adresse: this.adresseString, // Utilisez la chaîne d'adresse formatée
          langueParlee: this.langueParlee,
          typeDeCompte: this.typeDeCompte,
          servicePremium: this.servicePremium,
          forfait: this.forfait,
          dateDebutForfait: this.dateDebutForfait,
          dateFinForfait: this.dateFinForfait,
        };
    
        // Log de l'objet avant l'envoi
        console.log('Objet à envoyer au backend :', newUser);
    
        // Envoyer la requête POST vers le backend
        const response = await axios.post('http://localhost:5000/api/users/registerUser', newUser);
    
        // Log de la réponse reçue
        console.log('Réponse reçue du backend :', response.data);
    
        // Afficher le succès dans la console
        console.log('Utilisateur créé avec succès :', response.data);
        alert(`${response.data.message}`);
    
        // Réinitialiser le formulaire après la création de l'utilisateur
        this.resetForm();
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
    },



    /*---------------------------------------------Authentification-----------------------------------------------------------*/



    // Nouvelle action pour authentifier l'utilisateur
    async login(credentials: { email: string; password: string }) {
      try {
        // Envoyer la requête POST pour vérifier les identifiants
        const response = await axios.post('http://localhost:5000/api/users/login', credentials);
    
        // Si la réponse est positive, récupérer les informations de l'utilisateur
        if (response.data) {
          const userData = response.data;
    
          // Mettre à jour le store avec les informations de l'utilisateur
          this.nom = userData.nom;
          this.prenom = userData.prenom;
          this.email = userData.email;
          this.telephone = userData.telephone;
          this.adresseString = userData.adresse;
          this.langueParlee = userData.langueParlee;
          this.typeDeCompte = userData.typeDeCompte;
          this.servicePremium = userData.servicePremium;
          this.forfait = userData.forfait;
          this.dateDebutForfait = new Date(userData.dateDebutForfait);
          this.dateFinForfait = new Date(userData.dateFinForfait);
    
          // Indiquer que l'utilisateur est authentifié
          this.isAuthenticated = true;
          console.log('Connexion réussie:', userData);
          alert(`Connexion réussie!`);
        }
      } catch (error: any) {
        // Gestion spécifique des erreurs de connexion
        if (error.response) {
          if (error.response.status === 404) {
            // Cas où l'utilisateur n'existe pas dans la base de données
            console.error('Erreur : Utilisateur non trouvé. Veuillez vous inscrire.');
            throw new Error("Utilisateur non trouvé. Veuillez vous inscrire.");
          } else if (error.response.status === 401) {
            // Cas où le mot de passe ou l'email est incorrect
            console.error('Erreur : Email ou mot de passe incorrect.');
            throw new Error("Email ou mot de passe incorrect.");
          }
        } else {
          // Autres erreurs (exemple : problème de réseau, serveur hors ligne)
          console.error('Erreur de connexion :', error.message);
          throw new Error("Erreur de connexion. Veuillez réessayer plus tard.");
        }
      }
    },

  /*---------------------------------------------Se Déconnecter-----------------------------------------------------------*/
    
    // Action pour déconnecter l'utilisateur
    logout() {
      this.resetForm(); // Réinitialiser les informations utilisateur
      this.isAuthenticated = false; // Désactiver l'état d'authentification
      console.log('Déconnexion réussie.');
    },
  },
});
