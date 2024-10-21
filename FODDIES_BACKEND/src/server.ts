import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import restaurantRoutes from './router/restaurantRoutes';
import userRoutes from './router/userRoutes';
import evaluationRoutes from './router/evaluationRoutes';
import reservationRoutes from './router/reservationRoutes';

const app = express();

// Configuration CORS
const corsOptions = {
  origin: ['http://localhost:5173'], // Ajoute d'autres URLs si nécessaire
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
app.use('/api/users', userRoutes); // Ajoute cette ligne si tu souhaites activer cette route
app.use('/api/reservations', reservationRoutes);
app.use('/api/evaluations', evaluationRoutes);
 

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
