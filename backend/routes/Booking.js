const router = require("express").Router();
let Booking = require("../models/Booking.model");
let User = require("../models/User.model");
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
    const newBooking = await Booking.create({
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
      status: "en attente",
    });

    res.status(200).json({ newBooking });

  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

    // 3andik id mte3 driver w id mte3 user a3ml finByed el kolwahed bch tjib mail mte3ou w ba3ed 7outoua louta
    // a£9ra tw ta3ref win tjhoutou


router.post("/sendemail", async function (req, res) {
  const driverId = req.body.driverId;
  const userId = getUserToken(req.body.token);
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

  const bookingId = req.body.bookingId;
  const user = await User.findById({ _id: userId });
  const driver = await User.findById({ _id: driverId });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user.email,
        //user: "zouhairmakhloufa11@gmail.com",
        pass: "p4mzou1998nv",
      },
    });
    const mailOptions = {
      from: user.email,
      to: driver.email,
      subject: "Reservation Client",
      text1: `taget ${governorateAddressSource}`,
      text2: `taget ${addresSource}`,
      text3: `taget ${governorateAddressDestination}`,
      text4: `taget ${addressDestination}`,
      text5: `taget ${poids}`,
      text6: `taget ${hauteur}`,
      text7: `taget ${largeur}`,
      text8: `taget ${typeOfCars}`,
      text9: `taget ${service}`,
      text10: `taget ${packaging}`,
      text11: `taget ${paymentMethode}`,
      text12: `taget ${noteToDriver}`,

      html: `les information de mon reservation est la suite : <br> 
       addrese Source : ${governorateAddressSource} ${addresSource} <br> 
       addrese Destinataire : ${governorateAddressDestination} ${addressDestination} <br> 
       poids: ${poids} kg <br> 
       hauteur: ${hauteur} cm <br> 
       largeur: ${largeur} cm <br> 
       profondeur: ${profondeur} cm <br> 
       type de cars : ${typeOfCars} cm <br> 
       service: ${service} <br> 
       packaging: ${packaging} <br> 
       paymentMethode: ${paymentMethode} <br> 
       noteToDriver: ${noteToDriver} <br> 
       lien: http://localhost:3000/booking/${bookingId}
       '`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error ", err);
      } else {
        console.log("email send");
      }
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.post("/sendemailResponse", async function (req, res) {
  const isAccept = req.body.isAccept;
  const driverId = getUserToken(req.body.token);
  const userId = getUserToken(req.body.token);

  const bookingId = req.body.bookingId;
  const driver = await User.findById({ _id: driverId });
  const user = await User.findById({ _id: userId });
  console.log("cc",req.body)

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: driver.email,
        //user: "zouhairmakhloufa22@gmail.com",
        pass: "p4mzou1998nv",
      },
    });
    const mailOptions = {
      from: driver.email,
      to: user.email,
      subject: "concerning your reservation",
   
      html: `your reservation has been ${isAccept ? "accepted" : "refused"} <br> 
       lien: http://localhost:3000/booking/${bookingId}
       '`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error ", err);
      } else {
        console.log("email send");
      }
    });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});


router.route("/booking/:id").get(async (req, res) => {
  try {
    const booking = await Booking.findById({ _id: req.params.id }).populate(
      "userId"
    );
    res.status(200).json({ booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});


router.route("/bookingAccept/:id").put(async (req, res) => {
  try {
    Booking.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: "accepter" } },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        console.log(doc);
      }
    );

    res.status(200).json({ message: "accepter" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});


router.route("/bookingReffuse/:id").put(async (req, res) => {
  try {
    Booking.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: "refuser" } },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    );

    res.status(200).json({ message: "refuser" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
