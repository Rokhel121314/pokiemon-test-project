const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { urlencoded } = require("express");
const connectDB = require("./config/connectDB");
const FavoritePokemon = require("./models/pokemonModel");
const pokemonRoutes = require("./routes/pokemonRoutes");
const teamRoutes = require("./routes/teamRoutes");
const bodyParser = require("body-parser");
const { options } = require("./routes/pokemonRoutes");

const app = express();

// MIDDLE WARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(teamRoutes);
app.use(pokemonRoutes);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running in port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// test Routes

app.get("/", (req, res) => {
  res.send("test");
});
