import React from "react";

function PokemonSort() {
  return (
    <>
      <form className="sortInput">
        <select>
          <option>DESC</option>
          <option>ASC</option>
        </select>
      </form>
    </>
  );
}

export default PokemonSort;
