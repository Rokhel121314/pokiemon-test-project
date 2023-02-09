const express = require("express");
const {
  addPokemonTeam,
  getPokemonTeam,
} = require("../controllers//teamController");

const Pokemonteam = require("../models/pokemonTeam");

const router = express.Router();

// adding pokemonteam
router.post("/api/team", addPokemonTeam);

// getting  pokemonteam
router.get("/api/team", getPokemonTeam);

module.exports = router;
