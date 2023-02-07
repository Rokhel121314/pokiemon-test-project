import React, { useEffect, useState } from "react";

function PokemonSearch({ handleSearch, getPokemonSearch }) {
  // console.log("pokemonList", pokemonList);

  return (
    <div className="searchContainer row">
      <form>
        <input
          type="text"
          name="pokemonName"
          placeholder="search pokemon"
          className="searchInput col-5"
          onChange={handleSearch}
        />
        <button
          type="button"
          name="searchBtn"
          onClick={getPokemonSearch}
          className="searchBtn"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default PokemonSearch;
