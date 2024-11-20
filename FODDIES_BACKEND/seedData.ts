// seedData.ts
import { Types } from 'mongoose';
import { IReservation } from './src/database/models/ReservationModel';
import {UserType}  from './src/database/models/UserModel';


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
    image: '/images/image4.jpg',
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
    image: '/images/image1.jpg',
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
    image: '/images/image5.jpg',
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
    image: '/images/image2.jpg',
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
    image: '/images/image4.jpg',
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
    image: '/images/image1.jpg',
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
    image: '/images/image5.jpg',
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
    image: '/images/image2.jpg',
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
    image: '/images/image4.jpg',
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
    image: '/images/image1.jpg',
    utilisateurs: [] as Types.ObjectId[], // Explicitly define the type as ObjectId[]
  }
];

// Définir les données pour les utilisateurs

interface UserData {
  _id?: Types.ObjectId;
  nom: string;
  typeDeCompte: UserType,
  prenom: string;
  email: string;
  password: string;
  adresse: string;
  isConfirmed?: boolean;
  langueParlee?: string;
  dateInscription: Date;
  restaurantsUtilises?: any[];
  listeDesReservations?: any[];
  restaurantsDetenus?: any[];
  servicePremium?: boolean; 
  forfait?: any; 
  dateDebutForfait?: Date | null | undefined;
  dateFinForfait?:Date | null | undefined
}


const usersData: UserData[] = [
  

  {
    _id: new Types.ObjectId(),
    nom: 'Amary',
    prenom: 'Jean-jaurey',
    email: 'jj@gmail.com',
    password: 'jean2024',
    typeDeCompte: UserType.Client, 
    adresse: '789 avenue des courges, St-Lambert, Québec, Canada',
    isConfirmed: true,
    langueParlee: 'francais',
    dateInscription: new Date(),
    restaurantsUtilises: [],
    listeDesReservations: [],
  },

  {
    _id: new Types.ObjectId(),
    nom: 'Smith',
    prenom: 'Jane',
    email: 'jane.smith@gmail.com',
    password: 'jean2024',
    typeDeCompte: UserType.Client ,
    adresse: '101 Rue de Berlin, Montreal E, H2K 8L5, Québec, Canada',
    isConfirmed: false,
    langueParlee: 'anglais',
    dateInscription: new Date(),
    restaurantsUtilises: [],
    listeDesReservations: [],
  },

  {
    _id: new Types.ObjectId(), // Génération automatique d'un ObjectId
    nom: " Godbout",
    prenom: "joanie",
    email: "gjoanie@gmail.com",
    password: 'gj12345678', // Haché avec bcrypt
    typeDeCompte: UserType.Proprietaire,
    adresse: "405 mission catholique, Saint-Hyacinthe, Québec, Canada J2S 5M6",
    dateInscription: new Date(),
    isConfirmed: true,
    langueParlee: "francais",
    restaurantsDetenus: [restaurantsData[0]._id, restaurantsData[3]._id], // Références à des restaurants
    servicePremium: false,
    forfait: null,
    dateDebutForfait: null,
    dateFinForfait: null,
  },

  {
    _id: new Types.ObjectId(), // Génération automatique d'un ObjectId
    nom: "Borgson",
    prenom: "John",
    email: "admin@gmail.com",
    password: "admin12345678", // Haché avec bcrypt
    typeDeCompte: UserType.Admin,
    adresse: "123 Admin Street, Montréal, Québec, Canada",
    dateInscription: new Date(),
    isConfirmed: true,
  }
  
];

// Définir les données pour les évaluations
const evaluationsData = [
  { _id: new Types.ObjectId(),
    noteQualite: 5,
    noteProprete: 5,
    notePrix: 4,
    noteService: 4,
    noteAmbiance: 5,
    noteEtoile: 5,
    commentaire: 'Excellent service!',
    dateEvaluation: new Date('2024-10-22'),
    utilisateurId: usersData[0]?._id,
    restaurantId: restaurantsData[3]?._id,
    createAt: new Date(),
    updatedAt: new Date()
  },
  {
    noteQualite: 3,
    noteProprete: 3,
    notePrix: 2,
    noteService: 3,
    noteAmbiance: 3,
    noteEtoile: 3,
    commentaire: 'Un peu cher pour ce que c\'est.',
    dateEvaluation: new Date('2024-10-21'),
    utilisateurId: usersData[1]?._id,
    restaurantId: restaurantsData[2]?._id,
    createAt: new Date(),
    updatedAt: new Date()
  }
];

// Définir les données pour les réservations

const reservationsData: Partial<IReservation>[] = [
  {
    _id: new Types.ObjectId(),
    utilisateurId: usersData[1]?._id?.toString(),  // Jean-jaurey
    restaurantId: restaurantsData[2]?._id?.toString(),  // Le Gourmet
    dateReservation: new Date('2024-10-20'),
    heureReservation: '19:00',
    nombreDePlaces: 2,
    commentaires: 'J\'aime ce restaurant',
    createdAt: new Date('2024-10-20T05:04:20.383+00:00'),
    updatedAt: new Date('2024-10-20T05:04:20.383+00:00'),
  },

  { 
    _id: new Types.ObjectId(),
    utilisateurId: usersData[0]?._id?.toString(), // Jane Smith
    restaurantId: restaurantsData[3]?._id?.toString(),   // Sushi Place
    dateReservation: new Date('2024-10-21'),
    heureReservation: '12:30',
    nombreDePlaces: 4,
    commentaires: 'préférence pour la mezanine',
    createdAt: new Date('2024-10-21T05:04:20.383+00:00'),
    updatedAt: new Date('2024-10-21T05:04:20.383+00:00'),
  }
];


// Associer les utilisateurs aux restaurants
restaurantsData[2].utilisateurs.push(usersData[1]?._id ?? new Types.ObjectId());
restaurantsData[3].utilisateurs.push(usersData[0]?._id ?? new Types.ObjectId());

// Exporter les données de démonstration
export { restaurantsData, usersData, evaluationsData,reservationsData  };
