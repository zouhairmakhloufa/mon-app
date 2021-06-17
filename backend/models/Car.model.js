const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    name: { type: String },
    basePrice: { type: Number },
    klmPrice: { type: Number },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("Car", carSchema);
module.exports = User;
