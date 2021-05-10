const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// s'assure que le serveur peut recevoir json en tant que cprs de requete
app.use(express.json());

// grace a mongoose, nous connectons le serveur a mongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb://localhost:27017/logisticadb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const UserRouter = require("./routes/User");
const BookingRouter = require("./routes/Booking");
const CarsRouter = require("./routes/Car");

app.use("/user", UserRouter);
app.use("/booking", BookingRouter);
app.use("/car", CarsRouter);

// le serveur ecoute alors le N de port 5000 pour tt les demandes entrants
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
