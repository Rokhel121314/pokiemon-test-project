import React from "react";

function PokemonSort({ handleSelect }) {
  return (
    <>
      <form className="sortInput" onChange={handleSelect}>
        <select id="pokeSort" className="pokeSort">
          <option value="0">ASC</option>
          <option value="1">DESC</option>
        </select>
      </form>
    </>
  );
}

export default PokemonSort;
