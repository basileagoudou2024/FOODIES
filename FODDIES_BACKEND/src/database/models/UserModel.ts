

import mongoose, {Schema, Document, model } from 'mongoose';


// Définition des types d'utilisateurs
export enum UserType {
  Admin = 'Admin',
  Client = 'Client',
  Proprietaire = 'Propriétaire',
  Base = 'Base' // Ajout pour la cohérence avec la gestion des utilisateurs
}
// Interface de base pour tous les utilisateurs
export interface IBaseUser extends Document {
  _id: mongoose.Types.ObjectId;  // Ajout explicite de l'ID
  nom: string;
  prenom: string;
  email: string;
  password: string;
  typeDeCompte: UserType;
  adresse: string;
  dateInscription: Date; // Date de création attribuée par Mongoose
  confirmationCode?: number;
  confirmationCodeExpiration?: Date; // date d'expiration du code de confirmation
  isConfirmed: boolean;
}

// Interface pour un Admin
export interface IAdminUser extends IBaseUser {}

// Interface pour un Client
export interface IClientUser extends IBaseUser {
  langueParlee?: string;
  restaurantsUtilises?: mongoose.Types.ObjectId[]; // Référence aux restaurants utilisés
  listeDesReservations?: mongoose.Types.ObjectId[]; // Référence aux réservations
}


// Interface pour un Propriétaire
export interface IProprietaireUser extends IBaseUser {
  restaurantsDetenus: mongoose.Types.ObjectId[]; // Renommé depuis listeRestaurants
  servicePremium?: boolean;
  forfait?: string;
  dateDebutForfait?: Date;
  dateFinForfait?: Date;
}


// Schéma de base pour les utilisateurs
const baseUserSchema = new Schema<IBaseUser>({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  typeDeCompte: { type: String, required: true, enum: Object.values(UserType) },
  adresse: { type: String, required: true },
  dateInscription: { type: Date, default: Date.now },
  confirmationCode: { type: Number }, // Stockage temporaire du code de confirmation
  confirmationCodeExpiration: { type: Date },
  isConfirmed: { type: Boolean, default: false },
}, { 
  discriminatorKey: 'type', // Utilisé pour différencier les sous-modèles
  collection: 'users' // Nom de la collection MongoDB
});

// Modèle de base
const BaseUserModel = model<IBaseUser>('BaseUser', baseUserSchema);

// Schéma et modèle pour les Admins
const AdminUserModel = BaseUserModel.discriminator<IAdminUser>('Admin', new Schema({}, { _id: false }));

// Schéma et modèle pour les Clients
const ClientUserModel = BaseUserModel.discriminator<IClientUser>('Client', new Schema({
  langueParlee: { type: String, required: true },
  restaurantsUtilises: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
  listeDesReservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
}, { _id: false }));

// Schéma et modèle pour les Propriétaires
const ProprietaireUserModel = BaseUserModel.discriminator<IProprietaireUser>('Propriétaire', new Schema({
  restaurantsDetenus: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }], // Champ mis à jour
  servicePremium: { type: Boolean, default: false },
  forfait: { type: String },
  dateDebutForfait: { type: Date },
  dateFinForfait: { type: Date }
}, { _id: false }));

export { BaseUserModel, AdminUserModel, ClientUserModel, ProprietaireUserModel };
