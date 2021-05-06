const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    name: { type: String },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Car", carSchema);
module.exports = User;
