import { Request, Response } from 'express';
import * as userQueries from '../database/queries/userQueries';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Charge les variables d'environnement

// Récupère tous les utilisateurs de la base de données
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userQueries.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// Fonction d'envoi de courriel de confirmation
const sendConfirmationEmail = async (email: string, password: string, type: string) => {
  // Configuration du transporteur nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez Gmail ou un autre service (par exemple, Mailgun, SendGrid, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur (doit être configurée dans un fichier .env)
      pass: process.env.EMAIL_PASSWORD, // Mot de passe de l'e-mail de l'expéditeur
    },
  });

  // Contenu de l'email de confirmation
  const mailOptions = {
    from: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
    to: email, // Adresse e-mail du destinataire
    subject: 'Confirmation de création de compte Foodies',
    text: `Bonjour,

Votre compte a été créé avec succès sur Foodies!

Voici les détails de votre compte :
- Email : ${email}
- Mot de passe : ${password}
- Type de compte : ${type}

Merci d'utiliser Foodies!

Cordialement,
L'équipe Foodies`,
  };

  try {
    await transporter.sendMail(mailOptions); // Envoie de l'email
    console.log(`Email de confirmation envoyé à ${email}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi du courriel : ${error}`);
    throw new Error(`Erreur lors de l'envoi du courriel de confirmation à ${email}`);
  }
};

// Création d'un nouvel utilisateur et envoi d'un courriel de confirmation
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userQueries.createUser(req.body); // Ajoute l'utilisateur à la base de données MongoDB
    await sendConfirmationEmail(user.email, user.password, user.type); // Envoie l'email de confirmation
    res.status(201).json({ message: 'Utilisateur créé avec succès et email de confirmation envoyé.', user });
  } catch (error) {
    console.error(`Erreur lors de la création de l'utilisateur: ${error}`);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur ou de l\'envoi du courriel.' });
  }
};
