import mongoose from 'mongoose';
import Restaurant from './src/database/models/RestaurantModel';  // Importez votre modèle de restaurant

// Connexion à MongoDB
async function connectToMongoDB() {
  try {
    //await mongoose.connect('mongodb://localhost:27017/restaurant-db');
   
    console.log('Connected to MongoDB');

    // Définir les données de démonstration pour les restaurants
    const seedData = [
      { name: 'Le Gourmet', adress: 'Paris', phone: '(438)-287-5148', cuisine: 'Française', stars: 5, image: '/images/image1.jpg'},
      { name: 'Pizza Paradise', adress: 'Rome', phone: '(514)-516-0000', cuisine: 'Italienne', stars: 4, image: '/images/image3.jpg'},
      { name: 'Sushi Master', adress: 'Tokyo', phone: '(519)-400-0101', cuisine: 'Japonaise', stars: 5, image: '/images/image4.jpg'}
    ];

    // Insérer les restaurants dans la base de données
    await Restaurant.insertMany(seedData);
    console.log('Les restaurants ont été ajoutés avec succès dans la base de données.');

  } catch (err) {
    console.error('Erreur lors de l\'ajout des restaurants : ', err);
  } finally {
   // mongoose.disconnect();
    console.log('Déconnexion de MongoDB');
  }
}

export default  connectToMongoDB;


