const Pokemonteam = require("../models/pokemonTeam");

// ADDING FAVORITE POKEMON

const addPokemonTeam = async (req, res) => {
  const createTeam = req.body.createTeam;

  try {
    const team = await Pokemonteam.create(createTeam);
    res.status(200).json(team);
    console.log("added", createTeam);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("error", createTeam);
  }
};

// GETTING  POKEMON TEAM

const getPokemonTeam = async (req, res) => {
  try {
    const team = await Pokemonteam.find();
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  addPokemonTeam,
  getPokemonTeam,
};
