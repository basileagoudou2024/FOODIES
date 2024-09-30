import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant extends Document {
  nom: string;
  adresse: string;
  telephone: string;
  cuisine: string;
  heuresOuverture: string;
  etoiles: number;
  image: string;
  utilisateurs: mongoose.Types.ObjectId[]; // Référence vers les Utilisateurs
}

const restaurantSchema: Schema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  cuisine: { type: String, required: true },
  heuresOuverture: { type: String, required: true },
  etoiles: { type: Number, required: true },
  image: { type: String, required: true },
  utilisateurs: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
