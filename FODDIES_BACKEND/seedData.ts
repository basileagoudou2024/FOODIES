// seedData.ts
import { Types } from 'mongoose';

// Définir les données pour les restaurants
const restaurantsData = [
  {
    _id: new Types.ObjectId(),
    nom: 'Le Gourmet',
    adresse: '225 avenue des pins, Saint-Valérien, J5P 8L7, Québec, Canada',
    telephone: '514-928-4411',
    cuisine: 'Française',
    heuresOuverture: '08:00 - 22:00',
    etoiles: 5,
    image: '/images/image1.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]

  },
  {
    _id: new Types.ObjectId(),
    nom: 'Sushi Place',
    adresse: '10 rue des poto, Sainte-Carmelle, H2K 6G4, Québec, Canada',
    telephone: '0607080910',
    cuisine: 'Japonaise',
    heuresOuverture: '10:00 - 23:00',
    etoiles: 4,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  }
];

// Définir les données pour les utilisateurs

interface UserData {
  _id: Types.ObjectId;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  adresse: string;
  langueParlee: string;
  dateInscription: Date;
  restaurantsUtilises: any[];
}


const usersData: UserData[] = [
  

  {
    _id: new Types.ObjectId(),
    nom: 'Amary',
    prenom: 'Jean-jaurey',
    email: 'jj@hotmail.com',
    motDePasse: '********',
    adresse: '789 avenue des courges, St-Lambert, Québec, Canada',
    langueParlee: 'fr',
    dateInscription: new Date(),
    restaurantsUtilises: []
  },
  {
    _id: new Types.ObjectId(),
    nom: 'Smith',
    prenom: 'Jane',
    email: 'jane.smith@gmail.com',
    motDePasse: '***',
    adresse: '101 Rue de Berlin, Montreal E, H2K 8L5, Québec, Canada',
    langueParlee: 'en',
    dateInscription: new Date(),
    restaurantsUtilises: []
  }
];

// Définir les données pour les évaluations
const evaluationsData = [
  {
    noteQualite: 5,
    noteProprete: 5,
    notePrix: 4,
    noteService: 4,
    noteAmbiance: 5,
    noteEtoile: 5,
    commentaire: 'Excellent service!',
    credibilite: 10,
    utilisateur: usersData[0]._id,
    restaurant: restaurantsData[0]._id
  },
  {
    noteQualite: 3,
    noteProprete: 3,
    notePrix: 2,
    noteService: 3,
    noteAmbiance: 3,
    noteEtoile: 3,
    commentaire: 'Un peu cher pour ce que c\'est.',
    credibilite: 5,
    utilisateur: usersData[1]._id,
    restaurant: restaurantsData[1]._id
  }
];

// Associer les utilisateurs aux restaurants
restaurantsData[0].utilisateurs.push(usersData[0]._id, usersData[1]._id);
restaurantsData[1].utilisateurs.push(usersData[1]._id);

// Exporter les données de démonstration
export { restaurantsData, usersData, evaluationsData };
