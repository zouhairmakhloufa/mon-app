const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BagSchema = new Schema(
  {
    poids: { type: String },
    hauteur: { type: String },
    largeur: { type: String },
    profondeur: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  {
    timestamps: true,
  }
);

const Bag = mongoose.model("Bag", BagSchema);
module.exports = Bag;
