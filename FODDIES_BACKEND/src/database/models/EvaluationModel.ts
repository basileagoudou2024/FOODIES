import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface d'une évaluation
export interface IEvaluation extends Document {
  _id: Types.ObjectId;
  noteQualite: number;
  noteProprete: number;
  notePrix: number;
  noteService: number;
  noteAmbiance: number;
  noteEtoile: number; // Note principale en étoile (1-5)
  commentaire?: string;
  dateEvaluation: Date;
  utilisateurId: Types.ObjectId; // Référence à l'utilisateur
  restaurantId: Types.ObjectId; // Référence au restaurant
}

// Schéma de l'évaluation
const evaluationSchema: Schema = new Schema(
  {
    noteQualite: { type: Number, required: true, min: 1, max: 5 },
    noteProprete: { type: Number, required: true, min: 1, max: 5 },
    notePrix: { type: Number, required: true, min: 1, max: 5 },
    noteService: { type: Number, required: true, min: 1, max: 5 },
    noteAmbiance: { type: Number, required: true, min: 1, max: 5 },
    noteEtoile: { type: Number, required: true, min: 1, max: 5 }, // Note principale pour l'affichage des étoiles
    commentaire: { type: String, required: false }, // Le commentaire est facultatif
    dateEvaluation: { type: Date, default: Date.now }, // Date d'évaluation
    utilisateurId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence utilisateur
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Référence restaurant
  },
  { timestamps: true } // Ajoute createdAt et updatedAt automatiquement
);

// Export du modèle
export default mongoose.model<IEvaluation>('Evaluation', evaluationSchema);
