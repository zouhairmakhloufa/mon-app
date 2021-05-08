const router = require("express").Router();
let Booking = require("../models/Booking.model");

//JSON Web Token (JWT) est un standard ouvert  
//Il permet l'échange sécurisé de jetons (tokens) entre plusieurs parties
//Cette sécurité de l’échange se traduit par la vérification de l’intégrité des données 
const jwt = require("jsonwebtoken");
function getUserToken(token) {
  try {
    const decoded = jwt.verify(token, "jwt_secret");

    return decoded.user;
  } catch (error) {
    return null;
  }
}

router.route("/booking").post(async (req, res) => {
  console.log("req.body.", req.body);
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
  const typeOfCars = req.body.typeOfCars;
  const driverId = req.body.driverId;
  const userId = getUserToken(req.body.token);
  
  try {
    const nexBooking = await Booking.create({
      governorateAddressSource,
      addresSource,
      governorateAddressDestination,
      addressDestination,
      poids,
      hauteur,
      largeur,
      profondeur,
      carId: typeOfCars,
      service,
      packaging,
      paymentMethode,
      noteToDriver,
      userId,
      driverId,
    });

    res.status(200).json({ nexBooking });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
module.exports = router;
