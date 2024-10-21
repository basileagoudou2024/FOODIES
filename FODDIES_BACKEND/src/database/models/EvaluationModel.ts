
/*
Chaque Evaluation porte sur un certain nombre de critères, tels que : noteQualite, notePropreté, etc.
*/



import mongoose, { Schema, Document } from 'mongoose';

export interface IEvaluation extends Document {

  _id: mongoose.Types.ObjectId;
  noteQualite: number;
  noteProprete: number;
  notePrix: number;
  noteService: number;
  noteAmbiance: number;
  noteEtoile: number;    // Note principale en étoile (1-5)
  commentaire?: string;
  dateEvaluation: Date; // Date d'ajout de l'évaluation
  idUtilisateur: string,  // L'utilisateur qui a laissé cette évaluation
  idRestaurant: string  // Le restaurant évalué
  
}

// Schéma d'une Évaluation

const evaluationSchema: Schema = new Schema(
  {
    noteQualite: { type: Number, required: true, min: 1, max: 5 },
    noteProprete: { type: Number, required: true, min: 1, max: 5 },
    notePrix: { type: Number, required: true, min: 1, max: 5 },
    noteService: { type: Number, required: true, min: 1, max: 5 },
    noteAmbiance: { type: Number, required: true, min: 1, max: 5 },
    noteEtoile: { type: Number, required: true, min: 1, max: 5 }, // Note principale pour le calcul des étoiles
    commentaire: { type: String, required: true },
    dateEvaluation: { type: Date, default: Date.now }, // Date d'évaluation
    idUtilisateur: { type: String, required: true },
    idRestaurant: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IEvaluation>('Evaluation', evaluationSchema);
