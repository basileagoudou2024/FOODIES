


import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';
import { ref } from 'vue';



export const useUserStore = defineStore('userStore', {

  
  state: () => ({
    isAuthenticated: ref(false),  // Utilisateur authentififalse,
    confirmationStatus: false, 
    code: null as number | null,     // Code récupéré dans l'email utilisateur
    userInfo: {
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
      adresseString: '',            // Nouvelle propriété pour stocker l'adresse sous forme de chaîne
      typeDeCompte: 'Client',               // Par défaut 'Client', peut être 'Propriétaire' ou 'Admin'
      servicePremium: false,        // Booléen
      forfait: '',              // string
      dateDebutForfait: null as Date | null,
      dateFinForfait: null as Date | null,
    },
  }),

  actions: {
    // Mise à jour de l'adresse sous forme de chaîne
    updateAdresseString() {
      this.userInfo.adresseString = `${this.userInfo.adresse.numeroCivique} ${this.userInfo.adresse.rue}, ${this.userInfo.adresse.ville}, ${this.userInfo.adresse.province}, ${this.userInfo.adresse.pays} ${this.userInfo.adresse.codePostal}`;
    },

    // Réinitialisation du formulaire
    resetForm() {
      Object.assign(this.userInfo, {
        nom: '',
        prenom: '',
        email: '',
        password: '',
        telephone: '',
        adresse: {
          numeroCivique: '',
          rue: '',
          ville: '',
          province: '',
          pays: '',
          codePostal: '',
        },
        langueParlee: '',
        typeDeCompte: 'Client',
        servicePremium: false,
        forfait: '',
        dateDebutForfait: null,
        dateFinForfait: null,
      });
      this.isAuthenticated = false;
    },
    // Nouvelle action pour envoyer les informations d'inscription au backend
async registerUser() {
  try {
    this.updateAdresseString();

    const newUserInfo = {
      nom: this.userInfo.nom,
      prenom: this.userInfo.prenom,
      email: this.userInfo.email,
      password: this.userInfo.password,
      telephone: this.userInfo.telephone,
      adresse: this.userInfo.adresseString,
      langueParlee: this.userInfo.langueParlee,
      typeDeCompte: this.userInfo.typeDeCompte,
      servicePremium: this.userInfo.servicePremium,
      forfait: this.userInfo.forfait,
      dateDebutForfait: this.userInfo.dateDebutForfait,
      dateFinForfait: this.userInfo.dateFinForfait,
    };

    // Log de l'objet avant l'envoi
    console.log('Objet à envoyer au backend :', newUserInfo);

    localStorage.removeItem('utilisateurId');   // supprimer utilisateurId du localStorage, avant tout nouvelle inscription
    //localStorage.clear(); //nettoyer le localStorage avant toute nouvelle inscription
   

    // Envoyer la requête POST vers le backend
    const response = await axios.post('http://localhost:5000/api/users/registerUser', newUserInfo);

    // vérifier le statut de confirmation du nouvel l'utilisateur
    console.log('Statut inscription nouvel utilisateur:', this.confirmationStatus);

    // Log de la réponse reçue
    console.log('Réponse inscription nouvel utilisateur, reçue du backend  :', response.data);

    // Vérifiez que l'ID est renvoyé avec succès par l'API d'inscription
    const utilisateurId = response.data.user._id;

    // Stocker localement (localStorage) l'ID utilisateur après l'enregistrement
    localStorage.setItem('utilisateurId', utilisateurId);

    // Réinitialiser le formulaire après la création de l'utilisateur
    this.resetForm();

    // utiliser le statut de confirmation de l'utilisateur comme condition de redirection
    if (this.confirmationStatus === false) {
      console.log('statut de l\'utilisateur nouvellement inscrit:', this.confirmationStatus);
      router.push('/registerConfirm');          // Rediriger vers la page de confirmation
    } else {
      console.log("Inscription réussie !");
      this.redirectToRestaurantsPage(); // Rediriger vers la page des restaurants
    }

    // Indiquer que l'inscription a réussi
    return true;

  } catch (error: any) {
    console.error("Erreur lors de l'enregistrement :", error.response?.data || error.message);
  }
},

    // Action de connexion (Authentification)----------------------------------------------------------------------------------------

   // Action pour authentifier l'utilisateur et rediriger si les identifiants sont valides
async login(credentials: { email: string; password: string }) {
  try {
    localStorage.removeItem('userToken');  // supprimer du localStorage, tout userToken avant génération d'un nouveau
   

    const response = await axios.post('http://localhost:5000/api/users/login', credentials);

    // Log de la réponse reçue
    console.log('Réponse de connexion, reçue du backend  :', response.data);

    // Sauvegarder le token reçu
    const authToken = response.data.token;
    localStorage.setItem('userToken', authToken);

    // récuperer du localStorage le statut de confirmation de l'utilisateur
   
    const confirmationStatus = localStorage.getItem('confirmationStatus')
    console.log('Statut inscription utilisateur:', confirmationStatus);

    // utiliser le statut de confirmation de l'utilisateur comme condition de redirection
    if (confirmationStatus === 'false' || !confirmationStatus) {
      console.log('le statut de confirmation est:', confirmationStatus);
      router.push('/registerConfirm');          // Rediriger vers la page de confirmation
    } else {
      
      this.redirectToRestaurantsPage(); // Rediriger vers la page des restaurants
      console.log("Authentification réussie !");
    }
  } catch (error: any) {
    console.error("Erreur lors de la connexion :", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Échec de la connexion.");
  }
},


     // Action pour poster le code de confirmation au serveur pour validation---------------------------------------------------------

    // Validation du code de confirmation
async validateConfirmationCode(code: number) {
  try {
    const utilisateurId = localStorage.getItem('utilisateurId');
    console.log('l\'ID utilisateur à passer en URL est:', utilisateurId);
    console.log('le code de confirmation à valider est:', code);

    localStorage.removeItem('validatedCode');  // supprimer du localstorage, tout code de confirmation avant d'en valider un nouveau
    localStorage.removeItem('userToken');  // supprimer du localStorage, tout userToken avant génération d'un nouveau

    const response = await axios.post(`http://localhost:5000/api/users/validateCode/${utilisateurId}`, { code });

    // log de la réponse reçue
    console.log('Réponse du backend pour validation code de confirmation :', response.data);

    // Sauvegarder le token reçu dans le localStorage
    const confirmToken = response.data.token;
    localStorage.setItem('userToken', confirmToken);

    // Mettre à jour le statut de confirmation de l'utilisateur
    const confirmationStatus = response.data.isConfirmed;
    console.log('le statut de confirmation est:', confirmationStatus);

    // stocker dans le localStorage la valeur de confirmationStatus
    localStorage.setItem('confirmationStatus', confirmationStatus);

    if (confirmationStatus === false) {
      // Rediriger vers la page de confirmation d'inscription
      console.log("utilisateur non confirmé, veuillez confirmer votre compte.");
      router.push('/registerConfirm');
    } else {
      // sinon, Rediriger vers la page des restaurants
      console.log("Authentification réussie !");
      this.redirectToRestaurantsPage();  // Appel de la méthode de redirection
    }
  } catch (error: any) {
    console.error("Erreur de validation du code:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Erreur lors de la validation du code.");
  }
},

    // Action pour renvoyer un nouveau code de confirmation-------------------------------------------------------------------------

    // Récupération d'un nouveau code de confirmation
    async fetchConfirmationCode() {
      try {
        const utilisateurId = localStorage.getItem('utilisateurId');
        const response = await axios.post(`http://localhost:5000/api/users/resendCode/${utilisateurId}`);

        console.log('Nouveau code de confirmation renvoyé:', response.data);

      } catch (error) {
        throw new Error("Erreur lors de la demande d'un nouveau code.");
      }
    },

     // Méthode de redirection centralisée vers la page des restaurants ------------------------------------------------------------
     redirectToRestaurantsPage() {
      router.push('/restaurants');
      console.log("Redirection vers la page des restaurants...");
    },

    // Méthode de redirection centralisée vers la page de connexion ---------------------------------------------------------------

    redirectToLoginPage(){
      router.push('/');
      console.log("Redirection vers la page de connexion...");
    },

    // Déconnexion de l'utilisateur ------------------------------------------------------------------------------------------------

    logout() {
      Object.assign(this.userInfo, {
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
      this.isAuthenticated = false;
      localStorage.removeItem('userToken');
      sessionStorage.removeItem('userData');
      localStorage.removeItem('userId');
      sessionStorage.removeItem('userId');
      console.log('Déconnexion réussie.');
    },
  },
});
