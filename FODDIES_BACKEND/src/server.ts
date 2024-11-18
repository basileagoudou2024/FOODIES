

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import restaurantRoutes from './router/restaurantRoutes';
import userRoutes from './router/userRoutes';
import evaluationRoutes from './router/evaluationRoutes';
import reservationRoutes from './router/reservationRoutes';
import externalUserRoutes from './router/externalUserRoutes';  // Ajout de la route pour les utilisateurs externes
import apiRoutes from './router/apiRoutes';  // Ajout de la route pour les entreprises externes

const app = express();

// Configuration CORS
const corsOptions = {
  origin: ['http://localhost:5173'], // Ajoutez d'autres URLs si nécessaire
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Endpoint de test
app.get('/', (req, res) => {
  res.send('API Foodies is running');
});

// Utilisation des routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/external-users', externalUserRoutes); // Chemin pour les utilisateurs externes
app.use('/api/external', apiRoutes); // Chemin pour les accès externes des entreprises

// Connexion à MongoDB avec confirmation de démarrage
mongoose.connect('mongodb://localhost:27017/foodies')
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware de gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});
