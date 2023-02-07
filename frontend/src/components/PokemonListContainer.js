import Axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonDetailsContainer from "./PokemonDetailsContainer";
import PokemonGrid from "./PokemonGrid";
import PokemonSearch from "./PokemonSearch";
import PokemonSort from "./PokemonSort";

function PokemonListContainer(props) {
  const {
    pokemonList,
    isLoading,
    goNext,
    goPrevious,
    handleSearch,
    searchInput,
  } = props;
  const [pokemonData, setPokemonData] = useState();
  const [searchData, setSearchData] = useState([]);
  console.log("pokemonData", pokemonData);

  function pokemonDetail(pokemon) {
    setPokemonData(pokemon);
  }

  const getPokemonSearch = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput}`).then(
      (response) =>
        // console.log("response", response.data);

        !response.data ? "" : setPokemonData(response.data)
    );
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="pokemonListContainer col-6">
        {/* SEARCH AND FILTERS */}
        <div className="header col-12">
          <div className="utils">
            <PokemonSort />
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="btn">
            <button onClick={goPrevious} id="prevBtn" className="navBtn">
              PREVIOUS
            </button>
            <button onClick={goNext} className="navBtn">
              NEXT
            </button>
          </div>
        </div>
        <div className="pokemonList col-12">
          <PokemonGrid
            pokemonList={pokemonList}
            isLoading={isLoading}
            pokemonDetail={pokemonDetail}
          />
        </div>
      </div>
      <PokemonDetailsContainer
        pokemonData={pokemonData}
        searchData={searchData}
        handleSearch={handleSearch}
        getPokemonSearch={getPokemonSearch}
      />
    </>
  );
}

export default PokemonListContainer;
