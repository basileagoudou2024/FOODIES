// src/queries/restaurantQueries.ts
import Restaurant from '../models/RestaurantModel';
import { IRestaurant } from '../models/RestaurantModel';

export const getAllRestaurants = async (): Promise<IRestaurant[]> => {
  return await Restaurant.find().populate('utilisateurs').exec();
};

export const createRestaurant = async (data: Partial<IRestaurant>): Promise<IRestaurant> => {
  const newRestaurant = new Restaurant(data);
  return await newRestaurant.save();
};
