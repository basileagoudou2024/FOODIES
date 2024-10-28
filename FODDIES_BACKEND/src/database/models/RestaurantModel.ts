import mongoose, { Document, Schema } from 'mongoose';

export interface IRestaurant extends Document {
  nom: string;
  adresse: string;
  telephone: string;
  cuisine: string;
  heuresOuverture: string;
  image: string;
  utilisateurs: mongoose.Types.ObjectId[]; // Référence aux utilisateurs liés
  evaluations: mongoose.Types.ObjectId[]; // Référence aux évaluations liées
}

const restaurantSchema: Schema = new Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  cuisine: { type: String, required: true },
  heuresOuverture: { type: String, required: true },
  image: { type: String, required: true },
  utilisateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }],
  evaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation' }],
 
},

{ timestamps: true },

);

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema);


/* 
Le modèle Restaurant reste simple, sans propriétés calculées. Les informations seront
 extraites des évaluations au moment de la requête.

*/