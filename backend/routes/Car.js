const router = require("express").Router();
let Car = require("../models/Car.model");

router.route("/cars").get(async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({ cars });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
