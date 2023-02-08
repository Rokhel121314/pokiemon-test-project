import Axios from "axios";
import React, { useState } from "react";
import PokemonSearch from "./PokemonSearch";

function PokemonDetailsContainer({
  pokemonData,
  searchData,
  handleSearch,
  getPokemonSearch,
  pokemonURL,
  getFavoritePokemon,
  addFavoritePokemon,
}) {
  // console.log("pokemonData", pokemonData);
  // console.log("pokemonURL", pokemonURL);

  const abilities = !pokemonData
    ? ""
    : pokemonData.abilities
        .map((ability) => ability.ability)
        .map((abi) => abi.name);

  const statsValue = !pokemonData
    ? ""
    : pokemonData.stats?.map((stats) => stats.base_stat);

  // console.log("statsValue", statsValue);

  const statsName = !pokemonData
    ? ""
    : pokemonData.stats?.map((stats) => stats.stat).map((st) => st.name);

  // console.log("statsName", statsName);

  return (
    <>
      <div className="pokemonDetailsContainer col-3">
        <div className="pokeDetailContainer col-12">
          {!pokemonData ? (
            ""
          ) : (
            <div className="detailContainer" key={pokemonData.id}>
              <div className="pokemonDetail1 col-12">
                <img src={pokemonData.sprites.front_default} />
                <div className="name-type">
                  <span className="pokemonName">
                    {pokemonData.name.toUpperCase()}
                  </span>
                  <div className="pokemonType">
                    {pokemonData.types?.map((type) => {
                      return (
                        <span key={type.type.name}>
                          {type.type.name.toUpperCase()}
                        </span>
                      );
                    })}
                  </div>
                </div>
                {/* <button>ADD TO TEAM</button>
                <button>ADD TO FAVORITE</button> */}
              </div>
              <div className="pokemonDetail2 col-12">
                <div className="statsHeader row">POKEMON STATS & SKILLS</div>
                <div className="statsContainer col-10">
                  <div className="statsName col-8">
                    {statsName?.map((stats) => {
                      return <div>{stats.toUpperCase()}:</div>;
                    })}
                  </div>
                  <div className="statsValue col-4">
                    {statsValue?.map((stats) => {
                      return <div>{stats}</div>;
                    })}
                  </div>
                </div>
                <div className="skillsContainer row">
                  {abilities.map((ability) => {
                    return (
                      <div className="ability">{ability.toUpperCase()}</div>
                    );
                  })}
                </div>
              </div>
              <div className="addtoTeamFavoriteContainer">
                <button
                  type="submit"
                  className="addtoFavoriteBtn"
                  onClick={addFavoritePokemon}
                >
                  + FAVORITE
                </button>
                <button className="addtoTeamBtn"> + TEAM</button>
              </div>
            </div>
          )}
        </div>
        <PokemonSearch
          handleSearch={handleSearch}
          getPokemonSearch={getPokemonSearch}
        />
      </div>
    </>
  );
}

export default PokemonDetailsContainer;
