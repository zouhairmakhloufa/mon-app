const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Type: {type: String},
  email: {type: String},
  password: {type: String},
  typeOfCars: {type: String},
  FirstName: {type: String},
  LastName: {type: String}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;