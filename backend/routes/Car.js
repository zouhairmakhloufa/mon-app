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


router.route("/cars/:id").get(async (req, res) => {
  console.log(req.params.id);
  Car.findById({_id: req.params.id})
  .then(result => {
    res.status(200).json({ Car:result })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error:err })
  })
});

module.exports = router;
