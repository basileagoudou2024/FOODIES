
// models/ExternalUser.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ExternalUser extends Document {
  companyName: string;
  contactEmail: string;
  apiKey: string; // Clé API pour authentifier les requêtes
  accessLevel: 'read-only' | 'read-write'; // Permissions d'accès
  // autres champs si nécessaire
}

const externalUserSchema = new Schema<ExternalUser>({
  companyName: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  apiKey: { type: String, required: true, unique: true }, // clé générée lors de la création de l'utilisateur
  accessLevel: { type: String, enum: ['read-only', 'read-write'], default: 'read-only' },
});

export default mongoose.model<ExternalUser>('ExternalUser', externalUserSchema);
