
// Déclaration d'une interface pour le type `Restaurant`
// Ceci assure une meilleure vérification de type et intellisense
// Interface représentant la structure d'un restaurant
export interface Restaurant {
  _id: string;
  nom: string;
  adresse: string;
  telephone: string;
  cuisine: string;
  image: string;
  heuresOuverture: string;
  evaluations?: any[]; // On peut inclure les évaluations si elles sont récupérées.
  etoiles?: number; // La moyenne des étoiles calculée
  meilleurCommentaire?: string; // Meilleur commentaire calculé
}
