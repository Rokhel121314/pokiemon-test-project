import React from "react";
import PokemonSearch from "./PokemonSearch";

function PokemonDetailsContainer({
  pokemonData,
  searchData,
  handleSearch,
  getPokemonSearch,
}) {
  // console.log("pokemonData", pokemonData);

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
      <div className="pokemonDetailsContainer col-6">
        <div className="pokeDetailContainer col-12">
          {!pokemonData ? (
            ""
          ) : (
            <div className="detailContainer">
              <div className="pokemonDetail1 col-6">
                <img src={pokemonData.sprites.front_default} />
                <div className="name-type">
                  <span className="pokemonName">
                    {pokemonData.name.toUpperCase()}
                  </span>
                  <div className="pokemonType">
                    {pokemonData.types?.map((type) => {
                      return <span>{type.type.name.toUpperCase()}</span>;
                    })}
                  </div>
                </div>
                {/* <button>ADD TO TEAM</button>
                <button>ADD TO FAVORITE</button> */}
              </div>
              <div className="pokemonDetail2 col-6">
                <div className="statsHeader row">POKEMON STATS & SKILLS</div>
                <div className="statsContainer row">
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
                      <div className="ability col-10">
                        {ability.toUpperCase()}
                      </div>
                    );
                  })}
                </div>
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
