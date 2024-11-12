


import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';



export const useUserStore = defineStore('userStore', {

  
  state: () => ({
    isAuthenticated: false,
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
    // Nouvelle action pour envoyer les informations d'inscription au backend-------------------------------------------------------
    // Enregistrement de l'utilisateur
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


         // Envoyer la requête POST vers le backend
        const response = await axios.post('http://localhost:5000/api/users/registerUser', newUserInfo);

         // Log de la réponse reçue
         console.log('Réponse inscription nouvel utilisateur, reçue du backend  :', response.data);

       
        // Vérifiez que l'ID est renvoyé avec succès par l'API d'inscription

         const utilisateurId = response.data.user._id;

          // Stocker localement (localStorage) l'ID utilisateur  après l'enregistrement

        localStorage.setItem('utilisateurId', utilisateurId);


         // Réinitialiser le formulaire après la création de l'utilisateur
        this.resetForm();

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
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);

      // Sauvegarder le token reçu
      const token = response.data.token;
      localStorage.setItem('userToken', token);

      console.log("Authentification réussie !");
      this.redirectToRestaurantsPage(); // Appel de la nouvelle méthode de redirection
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
        console.log('le code de confirmation à valider est:', code)

        localStorage.removeItem('validatedCode');  // supprimer du localstorage, tout code de confirmation avant d'en valider un nouveau

        const response = await axios.post(`http://localhost:5000/api/users/validateCode/${utilisateurId}`, { code });

        console.log('Réponse pour validation code de confirmation, reçue du backend :', response.data);

        if (response.data.message === 'Code de confirmation validé avec succès.') {
          console.log("Code validé, redirection vers la page des restaurants.");

            // Enregistrer le code de confirmation dans le localStorage comme preuve temporaire d'authentification
                localStorage.setItem('validatedCode', code.toString());

          this.redirectToRestaurantsPage(); // Appel de la nouvelle méthode de redirection
        } else {
          console.error("Validation échouée :", response.data.message);
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


    // Déconnexion-------------------------------------------------------------------------------------------------------------------

    // Déconnexion de l'utilisateur

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
