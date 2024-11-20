import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { BaseUserModel, AdminUserModel, ClientUserModel, ProprietaireUserModel, UserType } from './src/database/models/UserModel';
import Restaurant from './src/database/models/RestaurantModel';
import Evaluation from './src/database/models/EvaluationModel';
import Reservation from './src/database/models/ReservationModel';
import { restaurantsData, usersData, evaluationsData, reservationsData } from './seedData';

// Fonction de hachage de mot de passe
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const MONGO_URI = 'mongodb://localhost:27017/foodies';

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connecté.');

    // Nettoyage de la base de données existante
    await Promise.all([
      BaseUserModel.deleteMany({}),
      AdminUserModel.deleteMany({}),
      ClientUserModel.deleteMany({}),
      ProprietaireUserModel.deleteMany({}),
      Restaurant.deleteMany({}),
      Evaluation.deleteMany({}),
      Reservation.deleteMany({})
    ]);

    console.log('Base de données nettoyée.');

    // Hachage des mots de passe des utilisateurs
    for (const user of usersData) {
      user.password = await hashPassword(user.password);
    }

    // Insertion des données
    await Restaurant.insertMany(restaurantsData);
    console.log('Restaurants ajoutés avec succès.');

    await Reservation.insertMany(reservationsData);
    console.log('Réservations ajoutées avec succès.');

    const baseUsersData = usersData.filter(user => user.typeDeCompte === UserType.Base);
    const adminUsersData = usersData.filter(user => user.typeDeCompte === UserType.Admin);
    const clientUsersData = usersData.filter(user => user.typeDeCompte === UserType.Client);
    const proprietaireUsersData = usersData.filter(user => user.typeDeCompte === UserType.Proprietaire);

    await Promise.all([
      BaseUserModel.insertMany(baseUsersData),
      AdminUserModel.insertMany(adminUsersData),
      ClientUserModel.insertMany(clientUsersData),
      ProprietaireUserModel.insertMany(proprietaireUsersData),
    ]);
    console.log('Utilisateurs ajoutés avec succès.');

    await Evaluation.insertMany(evaluationsData);
    console.log('Évaluations ajoutées avec succès.');
  } catch (error) {
    console.error('Erreur lors du seed :', error);
  } finally {
    // Déconnexion de MongoDB
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB.');
  }
}

// Exécuter le script
seedDatabase();
