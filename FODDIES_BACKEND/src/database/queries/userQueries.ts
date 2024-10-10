import { BaseUserModel, ClientUserModel, ProprietaireUserModel, IClientUser, IProprietaireUser, AdminUserModel } from '../models/UserModel';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';  // Pour le hachage de mots de passe
import jwt from 'jsonwebtoken';  // Pour la génération de tokens d'authentification

// Fonction de hachage de mot de passe
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Fonction pour vérifier le mot de passe
const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Fonction pour obtenir un utilisateur par email (peu importe le type)
export const getUserByEmail = async (email: string): Promise<any | null> => {
  return await BaseUserModel.findOne({ email }).exec();
};

/*------------------------------------------------------ENREGISTRER NOUVEL UTILISATEUR--------------------------------------------------*/

// Enregistrement d'un nouvel utilisateur
export const registerUser = async (data: any): Promise<any> => {
  const { email, password, typeDeCompte } = data;

  // Vérification si l'email existe déjà
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('Un utilisateur avec cet email existe déjà.');
  }

  // Hachage du mot de passe avant de l'enregistrer
  const hashedPassword = await hashPassword(password);
  data.password = hashedPassword;

  // Choisir le modèle en fonction du type de compte
  let newUser;
  switch (typeDeCompte) {
    case 'Admin':
      newUser = new AdminUserModel(data);
      break;
    case 'Client':
      newUser = new ClientUserModel(data);
      break;
    case 'Propriétaire':
      newUser = new ProprietaireUserModel(data);
      break;
    default:
      throw new Error(`Type de compte non supporté : ${typeDeCompte}`);
  }

  return await newUser.save();
};

/*--------------------------------------------------AUTHENTIFICATION------------------------------------------------------------------------------*/


// Connexion d'un utilisateur (authentification)
export const loginUser = async (email: string, password: string): Promise<string | null> => {
  // Rechercher l'utilisateur par email
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Cet utilisateur n'existe pas. Veuillez vous enregistrer.");
  }

  // Vérifier le mot de passe
  const isPasswordCorrect = await verifyPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Mot de passe incorrect. Veuillez réessayer.');
  }

  // Génération d'un token JWT
  const token = jwt.sign({ userId: user._id, typeDeCompte: user.typeDeCompte }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });

  return token;
};

/*--------------------------------------------------UTILISATEURS-------------------------------------------------------------------------------------*/

// Récupérer tous les utilisateurs
export const getAllUsers = async (): Promise<any[]> => {
  return await BaseUserModel.find().populate('restaurantsUtilises').exec();
};

// Fonction pour obtenir un utilisateur par ID
export const getUserById = async (userId: Types.ObjectId): Promise<any> => {
  return await BaseUserModel.findById(userId).exec();
};

// Fonction de mise à jour d'un utilisateur
export const updateUser = async (userId: Types.ObjectId, updateData: Partial<any>): Promise<any> => {
  return await BaseUserModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
};

// Suppression d'un utilisateur par ID
export const deleteUser = async (userId: Types.ObjectId): Promise<any> => {
  return await BaseUserModel.findByIdAndDelete(userId).exec();
};
