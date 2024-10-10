
// Déclaration d'une interface pour le type `Restaurant`
// Ceci assure une meilleure vérification de type et intellisense
// Interface représentant la structure d'un restaurant



export interface Evaluation{

 _id: string,
 utilisateur_id: string,
 restaurant_id: string,
 notePrix:number,
 noteQualite:number,
 noteService :number,
 noteProprete:number,
 noteEtoile:number,
 noteAmbiance:number,
 commentaire: string,
 createdAt: string,
 dateEvaluation: string,
 updatedAt: string,
 __v: number,
 }



export interface Restaurant {
  _id?: string;
  nom: string;
  adresse: string;
  telephone: string;
  cuisine: string;
  image: string;
  heuresOuverture: string;
  evaluations?: Evaluation[]; // Utilisation de l'interface `Evaluation`lée
  averageStars?: number; // La moyenne des étoiles calculée
  bestComment?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;

}













