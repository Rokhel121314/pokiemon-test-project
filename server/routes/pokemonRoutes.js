const express = require("express");
const {
  addFavoritePokemon,
  getFavoritePokemons,
} = require("../controllers/pokemonControllers");

const FavoritePokemon = require("../models/pokemonModel");

const router = express.Router();

// adding favorite pokemon
router.post("/api/pokemon", addFavoritePokemon);

// getting all favorite pokemon
router.get("/api/pokemon", getFavoritePokemons);

module.exports = router;
