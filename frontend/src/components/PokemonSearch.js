import React from "react";

function PokemonSearch({ handleSearch, getPokemonSearch }) {
  return (
    <div className="searchContainer col-12">
      <form className="formContainer row">
        <input
          type="text"
          name="pokemonName"
          placeholder="search pokemon"
          className="searchInput col-7"
          onChange={handleSearch}
          required={true}
        />
        <button
          type="button"
          name="searchBtn"
          onClick={getPokemonSearch}
          className="searchBtn col-3"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

export default PokemonSearch;
