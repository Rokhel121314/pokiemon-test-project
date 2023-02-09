import React from "react";

function Trainer({
  favePokemon,
  pokemonDetail,
  pokemonTeam,
  getFavoritePokemon,
  savePokemonTeam,
  teamUrl,
  teamData,
}) {
  return (
    <div className="col-3 trainerContainer">
      <header className="row trainerName">TRAINER NAME</header>

      {/* POKEMON TEAM BUILDER */}
      <section className="row pokemonTeamContainer">
        <div className="row teamTitle">TRAINER-NAME TEAM</div>
        <div className="teamContainer col-11">
          <div className="saveTeamContainer col-10">
            {!pokemonTeam
              ? ""
              : pokemonTeam?.map((team) => {
                  return (
                    <img
                      key={team.id}
                      src={team.sprites.front_default}
                      alt="sprites"
                      className="col-2 sprites"
                    />
                  );
                })}
          </div>
          <button className="saveTeamBtn col-2" onClick={savePokemonTeam}>
            SAVE
          </button>
        </div>

        {/* DISPLAYING SAVE TEAM */}
        <div className="displayTeamContainer col-12">
          {!teamData
            ? ""
            : teamData?.map((team, index) => {
                return (
                  <div key={team.id} className="col-3">
                    <img
                      src={team.sprites.front_default}
                      alt="teamImg"
                      className="teamImg col-2"
                    />
                  </div>
                );
              })}
        </div>
      </section>

      {/* FAVORITE POKEMON LIST */}
      <section className="row favoritePokemonContainer">
        <div className="row teamTitle">FAVORITE POKEMON</div>
        <div className="faveListContainer row">
          {!favePokemon
            ? ""
            : favePokemon.map((pokemon) => {
                return (
                  <div
                    onClick={() => {
                      getFavoritePokemon(pokemon.name);
                      pokemonDetail(pokemon);
                    }}
                    key={pokemon.id}
                    className="col-11 pokemonContainer"
                  >
                    <div className="col-2">{pokemon.id}</div>
                    <div className="col-4">
                      <img src={pokemon.sprites.front_default} />
                    </div>
                    <div className="col-6 favName">
                      {pokemon.name.toUpperCase()}
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
    </div>
  );
}

export default Trainer;
