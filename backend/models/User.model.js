const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Type: {type: String},
  FirstName: {type: String},
  LastName: {type: String},
  email: {type: String},
  password: {type: String},
  typeOfCars: {type: String}
}, {
  timestamps: true,
});

const User = mongoose.model('Signup', userSchema);

module.exports = User;