import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  listRestaurant: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  ],
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
});
OwnerSchema.pre("findOne", function (next) {
  this.populate({ path: "user", select: "name email" })
    .populate({ path: "plan", select: "name price" })
    .populate({ path: "listRestaurant", select: "name address " });
  next();
});

OwnerSchema.pre("find", function (next) {
  this.populate({ path: "user", select: "name email" })
    .populate({ path: "plan", select: "name price" })
    .populate({ path: "listRestaurant", select: "name address " });
  next();
});

export default mongoose.model("Owner", OwnerSchema);
