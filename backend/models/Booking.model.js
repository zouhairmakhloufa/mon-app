const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
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
}, {
  timestamps: true,
});

const Booking = mongoose.model('BDcontexte', bookingSchema);
module.exports = Booking;