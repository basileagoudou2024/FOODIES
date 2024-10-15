import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant extends Document {
  nom: string;
  adresse: string;
  telephone: string;
  cuisine: string;
  heuresOuverture: string;
  image: string;
  evaluation: mongoose.Types.ObjectId[]; // Références vers les évaluations liées
 
}

const restaurantSchema: Schema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  cuisine: { type: String, required: true },
  heuresOuverture: { type: String, required: true },
  image: { type: String, required: true },
  evaluations: [{ type: Schema.Types.ObjectId, ref: 'Evaluation' }],  // Liste des ObjectId des évaluations
},
  { timestamps: true },
);

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);


/* 
Le modèle Restaurant reste simple, sans propriétés calculées. Les informations seront
 extraites des évaluations au moment de la requête.

*/