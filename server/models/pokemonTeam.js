const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("mongoose-type-url");

const teamSchema = mongoose.Schema(
  {
    teamURL: {
      type: Array,
      required: [true, "please add a pokemon"],
    },
  },
  {
    timestamps: true,
  }
);

const Pokemonteam = mongoose.model("team", teamSchema);
module.exports = Pokemonteam;
