
// services/externalUserService.ts
import crypto from 'crypto';
import ExternalUser from '../database/models/ExternalUserModel';

export const generateApiKey = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Fonction pour créer un nouvel utilisateur externe avec une clé API
export const createExternalUser = async (companyName: string, contactEmail: string, accessLevel: 'read-only' | 'read-write') => {
  const apiKey = generateApiKey();
  const newUser = new ExternalUser({ companyName, contactEmail, apiKey, accessLevel });
  return await newUser.save();
};
