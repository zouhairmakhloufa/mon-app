const router = require("express").Router();
let User = require("../models/User.model");
let Car = require("../models/Car.model");

const jwt = require("jsonwebtoken");

router.route("/signup").post(async (req, res) => {
  const type = req.body.type;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  const TypeOfCars = req.body.TypeOfCars;
  const numDeTelf = req.body.numDeTelf;
  const basePrice = req.body.basePrice;
  const klmPrice = req.body.klmPrice;

  try {
    const newUser = new User({
      type,
      firstName,
      lastName,
      email,
      password,
      confirmpassword,
      TypeOfCars,
      numDeTelf,
    });
    const user = await newUser.save();
    if (type === "driver") {
      await Car.create({
        name: TypeOfCars,
        driverId: user._id,
        basePrice,
        klmPrice,
      });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "verify mail" });
    if (user.password !== password) {
      return res.status(400).json({ error: "verify password " });
    }

    const token = jwt.sign({ id: user._id }, "jwt_secret", {
      expiresIn: "24h",
    });
    return res
      .header("authorization", `Bearer ${token}`)
      .status(200)
      .send({ user, token });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/users").get(async (req, res) => {
  try {
    const user = await user.find();
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/users/:id").get(async (req, res) => {
  console.log(req.params.id);
  User.findById({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ user: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
