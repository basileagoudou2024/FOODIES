
import { UserType } from "../enum/userTypeEnum";
   
  
  export interface CreateUserParams {
    nom: string,
    prenom: string,
    email: string,      // Ajouté pour correspondre à `IUser`
    password: string,
    téléphone: string,   // Ajouté pour correspondre à `IUser`
    type: UserType,
    adresse: string, // Correspondance à `adresse: string` dans `IUser`
    langueParlee: string,
    servicePremium: boolean,   // Champ supplémentaire géré côté frontend
    forfait: string,
    dateDebut: Date, 
    dateFin: Date           // Champ supplémentaire géré côté frontend
  }
  
  