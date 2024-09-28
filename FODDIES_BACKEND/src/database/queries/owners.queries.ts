import Owner from "../models/OwnerModel.js";

export const createOwnerQuery = async (owner: typeof Owner) => {
  return Owner.create(owner);
};

export const getOwnersQuery = async () => {
  return Owner.find({});
};

export const getOwnerQuery = async (id: string) => {
  return Owner.findById(id);
};
export const updateOwnersWithRestaurant = async (owners: string, restaurantId : string) => {
  return Owner.updateMany(
    { _id: { $in: owners } },
    { $push: { listRestaurant: restaurantId } }
  );
};
