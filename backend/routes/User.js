const router = require("express").Router();
let User = require("../models/User.model");

router.route("/ajouter").post((req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;


  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    confirmpassword
  });
  // promise
  newUser.save()
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

module.exports = router;
