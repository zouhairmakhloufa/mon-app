const router = require("express").Router();
let Booking = require("../models/Booking.model");

const jwt = require("jsonwebtoken");

router.route("/booking").post((req, res) => {
  const governorateAddressSource = req.body.governorateAddressSource;
  const addresSource = req.body.addresSource;
  const governorateAddressDestination = req.body.governorateAddressDestination;
  const addressDestination = req.body.addressDestination;
  const poids = req.body.poids;
  const hauteur = req.body.hauteur;
  const largeur = req.body.largeur;
  const profondeur = req.body.profondeur;
  const service = req.body.service;
  const packaging = req.body.packaging;
  const paymentMethode = req.body.paymentMethode;
  const noteToDriver = req.body.noteToDriver;

  const newBooking = new Booking({
    governorateAddressSource,  addresSource,  governorateAddressDestination,  addressDestination,
    poids,  hauteur,  largeur, profondeur,  service,  packaging,  paymentMethode,  noteToDriver,
  });
  newBooking
    .save()
    .then(() => res.json("Test!!!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
