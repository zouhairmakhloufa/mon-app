const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  type: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  password: {type: String},
  confirmPassword:{type: String},
  typeOfCars: {type: String}
}, {
  timestamps: true,
});

const User = mongoose.model('something', userSchema);
module.exports = User;