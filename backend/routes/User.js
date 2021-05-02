const router = require("express").Router();
let User = require("../models/User.model");
const jwt = require("jsonwebtoken");

router.route("/ajouter").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  const TypeOfCars = req.body.TypeOfCars;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    TypeOfCars,
  });
  // promise
  newUser
    .save()
    .then(() => res.json("Test!!!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/supprimer/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User supprimeé"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/supprimer").delete((req, res) => {
  res.json("maghir params brabi thabet");
});

router.route("/").get(async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(email)
    console.log(password)
    console.log(user)

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
