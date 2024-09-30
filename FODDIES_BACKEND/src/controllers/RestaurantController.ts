
import { Request, Response } from 'express';
import * as restaurantQueries from '../database/queries/restaurantQueries';

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantQueries.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des restaurants.' });
  }
};


export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantQueries.createRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du restaurant.' });
  }
};


