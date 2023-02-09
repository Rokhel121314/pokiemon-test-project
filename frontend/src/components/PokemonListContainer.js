import React, { useState } from "react";
import PokemonDetailsContainer from "./PokemonDetailsContainer";
import PokemonGrid from "./PokemonGrid";
import PokemonSearch from "./PokemonSearch";
import PokemonSort from "./PokemonSort";
import PokemonList from "./PokemonList";
import Trainer from "./Trainer";

function PokemonListContainer(props) {
  const {
    pokemonList,
    isLoading,
    goNext,
    goPrevious,
    handleSearch,
    handleSelect,
    setViewOption,
    isGrid,
    view,
    pokemonData,
    pokemonDetail,
    getPokemonSearch,
    urlData,
    getFavoritePokemon,
    addFavoritePokemon,
    favoritePokemonList,
    setFavePokemon,
    favePokemon,
    getFavPokemonList,
    addToTeam,
    pokemonTeam,
    savePokemonTeam,
    teamUrl,
    teamData,
  } = props;

  const [searchData, setSearchData] = useState([]);

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
            getFavoritePokemon={getFavoritePokemon}
            pokemonData={pokemonData}
            urlData={urlData}
          />
        ) : (
          <PokemonList
            pokemonList={pokemonList}
            isLoading={isLoading}
            pokemonDetail={pokemonDetail}
            getFavoritePokemon={getFavoritePokemon}
            pokemonData={pokemonData}
            urlData={urlData}
          />
        )}
      </div>

      <PokemonDetailsContainer
        pokemonData={pokemonData}
        searchData={searchData}
        handleSearch={handleSearch}
        getPokemonSearch={getPokemonSearch}
        favoritePokemon={urlData}
        getFavoritePokemon={getFavoritePokemon}
        addFavoritePokemon={addFavoritePokemon}
        addToTeam={addToTeam}
      />
      <Trainer
        favoritePokemonList={favoritePokemonList}
        favePokemon={favePokemon}
        setFavePokemon={setFavePokemon}
        getFavPokemonList={getFavPokemonList}
        pokemonDetail={pokemonDetail}
        pokemonTeam={pokemonTeam}
        pokemonData={pokemonData}
        getFavoritePokemon={getFavoritePokemon}
        savePokemonTeam={savePokemonTeam}
        teamUrl={teamUrl}
        teamData={teamData}
      />
    </>
  );
}

export default PokemonListContainer;
