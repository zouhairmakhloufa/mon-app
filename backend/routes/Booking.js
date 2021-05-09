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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lena 7ot el email mte3ik el bch teb3eth bih kima zou@gmail.com",
        pass:
          "wlena trot mot de passe mte3 el mail fou9ani kima 256ddjsjdslskj",
      },
    });

    const mailOptions = {
      from:
        "kifkif lena t7ot mail mte3ik el bch teb3eth bih kima zou@gmail.com",
      to: "lena 7out mail eli bch teb3ethlou jareb ey mail bech testi",
      subject: "lena thout eli theb objet mte3 mail ",
      text: "lena el contenu mte3 mail rahou jek trajet ect ... juste testi",
    };

    transporter.sendMail(mailOptions, async (err, Response) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(200).json({ nexBooking });
      }
    });

    res.status(200).json({ nexBooking });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
module.exports = router;
