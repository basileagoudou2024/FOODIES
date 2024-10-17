


import { Request, Response } from 'express';
import { registerUser, loginUser, getUserById, updateUser, deleteUser, getAllUsers } from '../database/queries/userQueries';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';   
dotenv.config();           // Chargement des variables d'environnement depuis le fichier .env
import mongoose from 'mongoose';


// Validation des formats d'email et de mot de passe

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;     // Doit contenir au moins une lettre, un chiffre, et être d'une longueur minimale de 8 caractères
  return passwordRegex.test(password);
};

// Fonction d'envoi de courriel de confirmation
const sendConfirmationEmail = async (email: string) => {

  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true pour le port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirmation de création de compte Foodies',
    text: `Bonjour,

Votre compte a été créé avec succès sur Foodies!

Accéeder à votre compte en vous authentifiant sur la page suivante :http://localhost:5173

Merci d'utiliser Foodies!

Cordialement,

L'équipe Foodies`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email de confirmation envoyé à ${email}`);
  } catch (error) {
    console.log('Erreur lors de l\'envoi du courriel :', error);
    console.error(`Erreur lors de l'envoi du courriel : ${error}`);
    throw new Error(`Erreur lors de l'envoi du courriel de confirmation à ${email}`);
  }
};

//----------------------- Contrôleur pour l'enregistrement des utilisateurs----------------------------------------------*/

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

     // 1. Validation des entrées utilisateur

    if (!validateEmail(email)) {
      res.status(400).json({
        message: 'Format de l\'email invalide. Veuillez fournir un email valide.',
      });
      return;
    }

    if (!validatePassword(password)) {
      res.status(401).json({
        message: 'Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre et un chiffre.',
      });
      return;
    }

    // 2. Création de l'utilisateur dans la base de données

    const newUserInfo = await registerUser(req.body);
    console.log(`Utilisateur ${newUserInfo.email} créé avec succès dans la base de données.`);

     // 3. Envoi du courriel de confirmation

    await sendConfirmationEmail(newUserInfo.email);


     // 4. Envoi de la réponse HTTP avec statut 201 (Créé)

    res.status(201).json({
      message: 'Utilisateur créé avec succès et email de confirmation envoyé.',
      user: newUserInfo,
    });
  } catch (error) {
    console.error(`Erreur lors de l'enregistrement de l'utilisateur : ${error}`);
    res.status(500).json({
      message: 'Une erreur interne est survenue lors de l\'enregistrement de l\'utilisateur. Veuillez réessayer plus tard.',
    });
  }
};



//----------------------- Contrôleur pour la connexion des utilisateurs-----------------------------------------------------*/

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // 1. Validation de l'email et du mot de passe
    if (!validateEmail(email)) {
      res.status(500).json({ message: 'Format de l\'email invalide. Veuillez vérifier votre saisie.' });
      console.log('Format de l\'email invalide. Veuillez vérifier votre saisie.');
      return;
    }

    // TODO:  enlever "false&&"  après les tests

    if (false&&!validatePassword(password)) {
      res.status(500).json({
        message: 'Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre et un chiffre.',
        
      });

      console.log('Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre et un chiffre.')
      return;
    }

    // 2. Tentative de connexion
    const token = await loginUser(email, password);
    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (error: any) {
    res.status(500).json({ message: `Erreur de connexion : ${error.message}. Vérifiez vos identifiants.` });
    console.log(error);
  }
};

//--------------------------------- Contrôleur pour obtenir un utilisateur par son ID---------------------------------------*/

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'ID utilisateur invalide.' });
      return;
    }

    const user = await getUserById(new mongoose.Types.ObjectId(userId));
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé. Veuillez vérifier l\'ID.' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
};

//-------------------------------------------- Contrôleur pour récupérer tous les utilisateurs--------------------------------*/

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

//----------------------------------------- Contrôleur pour la mise à jour d'un utilisateur par ID ----------------------------*/

export const update = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'ID utilisateur invalide.' });
      return;
    }

    const updatedUser = await updateUser(new mongoose.Types.ObjectId(userId), updateData);
    if (!updatedUser) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

//------------------------------------- Contrôleur pour supprimer un utilisateur par son ID --------------------------------------*/


export const remove = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'ID utilisateur invalide.' });
      return;
    }

    const deletedUser = await deleteUser(new mongoose.Types.ObjectId(userId));
    if (!deletedUser) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.', user: deletedUser });
  } catch (error: any) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};
