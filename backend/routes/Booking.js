const router = require("express").Router();
let Booking = require("../models/Booking.model");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
//JSON Web Token (JWT) est un standard ouvert
//Il permet l'échange sécurisé de jetons (tokens) entre plusieurs parties
//Cette sécurité de l’échange se traduit par la vérification de l’intégrité des données

function getUserToken(token) {
  try {
    const decoded = jwt.verify(token, "jwt_secret");

    return decoded.id;
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

    // 3andik id mte3 driver w id mte3 user a3ml finByed el kolwahed bch tjib mail mte3ou w ba3ed 7outoua louta
    // a£9ra tw ta3ref win tjhoutou
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.post('/sendemail', function (req, res) { 
  console.log("req.body.", req.body);
  const driverId = req.body.driverId;
  const userId = getUserToken(req.body.token);
  try {
    const sendEmail = await ({
      driverId,
      userId
    });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zouhairmakhloufa11@gmail.com",
      pass: "p4mzou1998nv",
    },
  });
  const mailOptions = {
    from: "zouhairmakhloufa11@gmail.com",
    to: "zouhairmakhloufa22@gmail.com",
    subject: "bonjour",
    text: "Normalment temshi",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) { console.log('Error ' , err); } 
    else { console.log('email send'); }
  });
  
} catch (err) { res.status(400).json("Error: " + err);}
});
module.exports = router;
