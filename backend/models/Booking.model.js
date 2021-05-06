const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    governorateAddressSource: { type: String },
    addresSource: { type: String },
    governorateAddressDestination: { type: String },
    addressDestination: { type: String },
    poids: { type: String },
    hauteur: { type: String },
    largeur: { type: String },
    profondeur: { type: String },
    service: { type: String },
    packaging: { type: String },
    paymentMethode: { type: String },
    noteToDriver: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
