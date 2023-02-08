import Axios from "axios";
import React, { useEffect, useState } from "react";

function Trainer({ favePokemon, pokemonDetail }) {
  return (
    <div className="col-3 trainerContainer">
      <header className="row trainerName">TRAINER JERICK</header>
      <section className="row pokemonTeamContainer">
        <div className="row teamTitle">JERICKS TEAM</div>
      </section>
      <section className="row favoritePokemonContainer">
        <div className="row teamTitle">FAVORITE POKEMON</div>
        <div className="faveListContainer row">
          {!favePokemon
            ? ""
            : favePokemon.map((pokemon) => {
                return (
                  <div
                    onClick={() => {
                      pokemonDetail(pokemon);
                    }}
                    key={pokemon.id}
                    className="row pokemonContainer"
                  >
                    <div className="col-4">{pokemon.id}</div>
                    <div className="col-4">
                      <img src={pokemon.sprites.front_default} />
                    </div>
                    <div className="col-4">{pokemon.name}</div>
                  </div>
                );
              })}
        </div>
      </section>
    </div>
  );
}

export default Trainer;
