import React from "react";

function PokemonGrid({
  pokemonList,
  isLoading,
  pokemonDetail,
  getFavoritePokemon,
  urlData,
}) {
  return (
    <>
      <div className="pokemonGridView col-12">
        {isLoading ? (
          <span>wait for a seconds....</span>
        ) : (
          pokemonList.map((pokemon) => {
            return (
              <button
                className="pokemonGrid"
                key={pokemon.id}
                onClick={() => {
                  getFavoritePokemon(pokemon.name);
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
      </div>
    </>
  );
}

export default PokemonGrid;
