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
    telephone: '579-256-2425',
    cuisine: 'Japonaise',
    heuresOuverture: '10:00 - 23:00',
    etoiles: 4.5,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'La Belle Province',
    adresse: '195 rue dessaulles, St-hyacinthe, j2S 6G4, Québec, Canada',
    telephone: '438-444-5021',
    cuisine: 'Québécoise',
    heuresOuverture: '6:00 - 21:00',
    etoiles: 4.2,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'La Vraie Poutine',
    adresse: '10 avenue soleil, Saint-Jude, M5K 3P2, Québec, Canada',
    telephone: '514-444-5521',
    cuisine: 'Québécoise',
    heuresOuverture: '11:00 - 22:00',
    etoiles: 4.6,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'La Cuisine Santé',
    adresse: '1200 avenue Sainte-Cathérine, Saint Bruno de Montarville, R8P 9L1, Québec, Canada',
    telephone: '438-231-5132',
    cuisine: 'végétarienne',
    heuresOuverture: '10:00 - 22:00',
    etoiles: 4.5,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'La Pizza du Coin',
    adresse: '200 boulevard Laframboise, St-hyacinthe, j2S 5P8, Québec, Canada',
    telephone: '438-892-5521',
    cuisine: 'mixte',
    heuresOuverture: '10:30 - 21:00',
    etoiles: 4.2,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'Sushi Matsu',
    adresse: '1215 boulevard Cassavant, St-hyacinthe, j2S 4K9, Québec, Canada',
    telephone: '514-000-1012',
    cuisine: 'Coréenne',
    heuresOuverture: '9:00 - 22:00',
    etoiles: 4.2,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'Le Vieux Duluth',
    adresse: '912 avenue Brunelle, Boucherville, P4L 3H6, Québec, Canada',
    telephone: '438-298-1547',
    cuisine: 'mixte',
    heuresOuverture: '10:00 - 23:00',
    etoiles: 4.3,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'Le Bananier Antillais',
    adresse: '655 rue Girouard-Ouest, St-hyacinthe, j2S 4H2, Québec, Canada',
    telephone: '514-424-5622',
    cuisine: 'antillaise',
    heuresOuverture: '9:00 - 21:00',
    etoiles: 4.2,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'Le Mont-Cameroun',
    adresse: '200 avenue Vanier, Montréal, H4P 2L8, Québec, Canada',
    telephone: '514-925-7044',
    cuisine: 'Africaine',
    heuresOuverture: '11:00 - 22:00',
    etoiles: 4.7,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'Les Plats Gourmand',
    adresse: '115 rue des canards, Saint-Boniface, K5M 3H5, Québec, Canada',
    telephone: '438-345-6025',
    cuisine: 'française',
    heuresOuverture: '11:00 - 22:00',
    etoiles: 4.5,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: 'Burritos Comesticos',
    adresse: '10 avenue Billar, St-Lambert, P5P 6K7, Québec, Canada',
    telephone: '514-255-5241',
    cuisine: 'Mexicaine',
    heuresOuverture: '11:00 - 21:00',
    etoiles: 4.5,
    image: '/images/image3.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  },

  {
    _id: new Types.ObjectId(),
    nom: ' Légumes d\'Afrik',
    adresse: '1015 rue platonien, Saint, j2S 6G4, Québec, Canada',
    telephone: '438-417-5422',
    cuisine: 'africaine',
    heuresOuverture: '9:00 - 21:00',
    etoiles: 4.6,
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
