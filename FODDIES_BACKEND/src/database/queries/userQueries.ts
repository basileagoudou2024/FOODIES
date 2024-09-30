


import User from '../models/UserModel';
import { IUser } from '../models/UserModel';
export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find().populate('restaurantsUtilises').exec();
};

export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
  const newUser = new User(data);
  return await newUser.save();
};
