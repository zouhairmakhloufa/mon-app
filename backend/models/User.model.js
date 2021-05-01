const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  password: {type: String},
  confirmpassword:{type: String},
  TypeOfCars:{type: String},

}, {
  timestamps: true,
});

const User = mongoose.model('signup', userSchema);
module.exports = User;