
// Déclaration d'une interface pour le type `Restaurant`
// Ceci assure une meilleure vérification de type et intellisense
export  interface Restaurant {
    _id: string;        // Identifiant unique du restaurant (ID de MongoDB)
    name: string;       // Nom du restaurant
    adress: string;     // Adresse du restaurant
    phone: string;      // Numéro de téléphone
    cuisine: string;    // Type de cuisine (ex : Italien, Chinois, etc.)
    stars: number;      // Note de l'évaluation sur 5 étoiles
    image: string;      // URL de l'image du restaurant
    openingHours: string; // Description textuelle du restaurant
  }