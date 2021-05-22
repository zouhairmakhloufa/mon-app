const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InfoBagSchema = new Schema(
  {
    poids: { type: String },
    hauteur: { type: String },
    largeur: { type: String },
    profondeur: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingId: { type: String },
  },
  {
    timestamps: true,
  }
);

const InfoBag = mongoose.model("InfoBag", InfoBagSchema);
module.exports = InfoBag;
