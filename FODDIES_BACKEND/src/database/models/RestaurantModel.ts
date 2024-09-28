import mongoose, { Schema, Document } from 'mongoose';

// Définition de l'interface TypeScript
export interface IRestaurant extends Document {
  name: string;
  adress: string;
  phone: string;
  cuisine: string;
  stars: number;
  image: string;
  description: string;
}

// Définition du schéma Mongoose
const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  adress: { type: String, required: true },
  phone: { type: String, required: true },
  cuisine: { type: String, required: true },
  stars: { type: Number, min: 1, max: 5 },
  image: { type: String, required: false },
  description: { type: String, required: false },
});

// Exporter le modèle avec l'interface associée
export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
