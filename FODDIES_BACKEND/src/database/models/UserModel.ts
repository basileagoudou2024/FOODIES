import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  adresse: string;
  langueParlee: string;
  dateInscription: Date;
  restaurantsUtilises: mongoose.Types.ObjectId[]; // Référence vers les Restaurants
}

const userSchema: Schema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  adresse: { type: String, required: true },
  langueParlee: { type: String, required: true },
  dateInscription: { type: Date, default: Date.now },
  restaurantsUtilises: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
});

export default mongoose.model<IUser>('User', userSchema);
