import Restaurant from "../models/RestaurantModel";

export const createRestaurantQuery = async (restaurant: typeof Restaurant) => {
  return Restaurant.create(restaurant);
};

export const getRestaurantsQuery = async () => {
  return Restaurant.find({})
    .populate({
      path: "owners",
    })
    .select("name  openingHours")
    .exec();
};

export const getRestaurantQuery = async (id: string) => {
  return Restaurant.findById(id)
    .populate({
      path: "owners",
    })
    .select("name  openingHours")
    .exec();
};
