

export interface Restaurant {
  _id: string;   // attribuée explicitement par la base de donnée
  nom: string;
  adresse: string;
  telephone: string;
  cuisine: string;
  points: number; // moyenne des (moyennes pondérées de notes de chaque utilisateur) 
  image: string;
  heuresOuverture: string;
  etoiles: number; // La moyenne des étoiles attribuées par les utilisateurs
  meilleurCommentaire: string;   // comment de l'évaluation qui a obtenu la plus grande moyenne pondérée
  createdAt?: string;  // généré automatiquement par la base de donnée
  updatedAt?: string;   // généré automatiquement par la base de donnée
  __v?: number;   // généré automatiquement par la base de donnée
  evaluations: any[]; 

}













