import React, { useEffect, useState } from "react";

function PokemonSearch({ handleSearch, getPokemonSearch }) {
  // console.log("pokemonList", pokemonList);

  return (
    <div className="searchContainer col-12">
      <form className="formContainer row">
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
          className="searchBtn col-5"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default PokemonSearch;
