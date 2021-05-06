const router = require("express").Router();
let User = require("../models/User.model");
let Car = require("../models/Car.model");

const jwt = require("jsonwebtoken");

router.route("/ajouter").post(async (req, res) => {
  const type = req.body.type;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  const TypeOfCars = req.body.TypeOfCars;
  try {
    const newUser = new User({
      type,
      firstName,
      lastName,
      email,
      password,
      confirmpassword,
      TypeOfCars,
    });
    const user = await newUser.save();
    if (type === "driver") {
      await Car.create({
        name: TypeOfCars,
        driverId: user._id,
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

module.exports = router;
