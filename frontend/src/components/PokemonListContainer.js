import Axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonDetailsContainer from "./PokemonDetailsContainer";
import PokemonGrid from "./PokemonGrid";
import PokemonSearch from "./PokemonSearch";
import PokemonSort from "./PokemonSort";
import PokemonList from "./PokemonList";

function PokemonListContainer(props) {
  const {
    pokemonList,
    isLoading,
    goNext,
    goPrevious,
    handleSearch,
    searchInput,
    handleSelect,
    setViewOption,
    isGrid,
    view,
  } = props;
  const [pokemonData, setPokemonData] = useState("");
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
            <PokemonSort handleSelect={handleSelect} />
            <button onClick={setViewOption} className="viewBtn">
              {view}
            </button>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="btn">
            <button onClick={goPrevious} id="prevBtn" className="navBtn">
              {`< PREVIOUS`}
            </button>
            <button onClick={goNext} className="navBtn">
              {`NEXT >`}
            </button>
          </div>
        </div>
        {isGrid ? (
          <PokemonGrid
            pokemonList={pokemonList}
            isLoading={isLoading}
            pokemonDetail={pokemonDetail}
          />
        ) : (
          <PokemonList
            pokemonList={pokemonList}
            isLoading={isLoading}
            pokemonDetail={pokemonDetail}
          />
        )}
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
