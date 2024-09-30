// seed.ts
import mongoose from 'mongoose';
import User from './src/database/models/UserModel';
import Restaurant from './src/database/models/RestaurantModel';
import Evaluation from './src/database/models/EvaluationModel';
import { restaurantsData, usersData, evaluationsData } from './seedData';

const MONGO_URI = 'mongodb://localhost:27017/foodies';

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connecté.');

    // Nettoyage de la base de données existante
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Evaluation.deleteMany({});

    // Insérer les restaurants dans la base de données
    await Restaurant.insertMany(restaurantsData);
    console.log('Les restaurants ont été ajoutés avec succès dans la base de données.');

    // Insérer les utilisateurs dans la base de données
    await User.insertMany(usersData);
    console.log('Les utilisateurs ont été ajoutés avec succès dans la base de données.');

    // Insérer les évaluations dans la base de données
    await Evaluation.insertMany(evaluationsData);
    console.log('Les évaluations ont été ajoutées avec succès dans la base de données.');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des données : ', error);
  } finally {
    // Déconnexion de MongoDB
    await mongoose.disconnect();
    console.log('Déconnexion de MongoDB.');
  }
}

// Exécuter le script
seedDatabase();
