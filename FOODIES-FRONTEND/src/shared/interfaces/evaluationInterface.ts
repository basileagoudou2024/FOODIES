

// Interface de l'utilisateur ayant évalué un restaurant
export interface Evaluation {
    _id?: string;  // attribué automatiquement par mongoDB
    utilisateurId: string;
    restaurantId: string;
    idReservation?: string;
    noteProprete: number;  // Note de propreté (1-5)
    noteQualite: number;   // Note de qualité (1-5)
    noteService: number;   // Note de service (1-5)
    notePrix: number;      // Note de prix (1-5)
    noteAmbiance: number;  // Note d’ambiance (1-5)
    noteEtoile: number;  // Nombre d'étoiles (1-5)
    commentaire?: string;  // Commentaire optionnel
    dateEvaluation: string //createdAt: Date;  // Date de l'évaluation
  }
  