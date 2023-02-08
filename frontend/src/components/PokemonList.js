import React from "react";

function PokemonList({
  pokemonList,
  isLoading,
  pokemonDetail,
  getFavoritePokemon,
}) {
  return (
    <div>
      <>
        <div className="pokemonListView col-12">
          {isLoading ? (
            <span>wait for a seconds....</span>
          ) : (
            pokemonList.map((pokemon) => {
              return (
                <button
                  className="pokemonListBtn col-11"
                  key={pokemon.id}
                  onClick={() => {
                    getFavoritePokemon(pokemon.name);
                    pokemonDetail(pokemon);
                  }}
                >
                  <div className="pokeIdList col-2">{pokemon.id}</div>
                  <div className="pokeImageList col-7">
                    <img
                      src={pokemon.sprites.front_default}
                      alt="pokeImageList"
                    />
                  </div>

                  <div className="pokeName col-3">
                    {pokemon.name.toUpperCase()}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </>
    </div>
  );
}

export default PokemonList;
