import React from "react";

function PokemonGrid({ pokemonList, isLoading, pokemonDetail }) {
  //   console.log("pokemonList", pokemonList);
  return (
    <>
      {isLoading ? (
        <span>wait for a seconds....</span>
      ) : (
        pokemonList.map((pokemon) => {
          return (
            <button
              className="pokemonGrid"
              key={pokemon.id}
              onClick={() => {
                pokemonDetail(pokemon);
              }}
            >
              <div className="pokeId">{pokemon.id}</div>
              <div className="pokeImage">
                <img src={pokemon.sprites.front_default} alt="pokeImage" />
              </div>

              <div className="pokeName">{pokemon.name.toUpperCase()}</div>
            </button>
          );
        })
      )}
    </>
  );
}

export default PokemonGrid;
