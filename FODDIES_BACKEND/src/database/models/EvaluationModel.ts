import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './UserModel';
import { IRestaurant } from './RestaurantModel';

export interface IEvaluation extends Document {
  noteQualite: number;
  noteProprete: number;
  notePrix: number;
  noteService: number;
  noteAmbiance: number;
  noteEtoile: number;
  commentaire: string;
  credibilite: number;
  utilisateur: IUser['_id']; // Référence vers l'Utilisateur
  restaurant: IRestaurant['_id']; // Référence vers le Restaurant
}

const evaluationSchema: Schema = new Schema({
  noteQualite: { type: Number, required: true },
  noteProprete: { type: Number, required: true },
  notePrix: { type: Number, required: true },
  noteService: { type: Number, required: true },
  noteAmbiance: { type: Number, required: true },
  noteEtoile: { type: Number, required: true },
  commentaire: { type: String, required: true },
  credibilite: { type: Number, required: true },
  utilisateur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true }
});

export default mongoose.model<IEvaluation>('Evaluation', evaluationSchema);
