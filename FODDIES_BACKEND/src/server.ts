import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import restaurantRoutes from './router/restaurantRoutes';  // Assurez-vous que le chemin est correct
import userRoutes from './router/userRoutes';
import evaluationRoutes from './router/evaluationRoutes';

const app = express();

// Configuration CORS
const corsOptions = {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API Foodies is running');
});


// Utilisation des routes
app.use('/api/restaurants', restaurantRoutes);  // S'assurer que la route est correctement définie ici
//app.use('/api/users', userRoutes);
app.use('/api/evaluations', evaluationRoutes);

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/foodies')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
