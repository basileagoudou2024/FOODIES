import { Request, Response } from 'express';
import Restaurant from '../database/models/RestaurantModel';

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des restaurants' });
  }
};
