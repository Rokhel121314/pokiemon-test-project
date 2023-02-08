const FavoritePokemon = require("../models/pokemonModel");

// ADDING FAVORITE POKEMON

const addFavoritePokemon = async (req, res) => {
  const pokemonURL = req.body.pokemonURL;

  try {
    const pokemon = await FavoritePokemon.create(pokemonURL);
    res.status(200).json(pokemon);
    console.log("pokemonURL", pokemonURL);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("pokemonURL", pokemonURL);
  }
};

// GETTING FAVORITE POKEMON

const getFavoritePokemons = async (req, res) => {
  try {
    const favoritePokemon = await FavoritePokemon.find();
    res.status(200).json(favoritePokemon);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  addFavoritePokemon,
  getFavoritePokemons,
};
