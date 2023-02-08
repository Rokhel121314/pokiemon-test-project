const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("mongoose-type-url");

const favoritePokemonSchema = mongoose.Schema(
  {
    pokemonURL: {
      type: String,
      required: [true, "please add a favorite pokemon"],
    },
  },
  {
    timestamps: true,
  }
);

const FavoritePokemon = mongoose.model(
  "favoritePokemon",
  favoritePokemonSchema
);
module.exports = FavoritePokemon;
