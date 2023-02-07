import { useEffect, useState } from "react";
import PokemonDetailsContainer from "./components/PokemonDetailsContainer";
import PokemonListContainer from "./components/PokemonListContainer";
import style from "./css/style.css";
import Axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonSet, setPokemonSet] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [nextPokemonSet, setNextPokemonSet] = useState();
  const [prevPokemonSet, setPrevPokemonSet] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState(0);
  const [isGrid, setIsGrid] = useState(true);
  const [view, setView] = useState("GRID VIEW");

  // console.log("next", nextPokemonSet);
  // console.log("prev", prevPokemonSet);
  // console.log("searchInput", searchInput);
  // console.log("pokemonList", pokemonList);
  // console.log("selectValue", selectValue);
  // console.log("grid?", isGrid);

  const pokeGet = async () => {
    try {
      setIsLoading(true);
      const res = await Axios.get(pokemonSet);
      setNextPokemonSet(res.data.next);
      setPrevPokemonSet(res.data.previous);
      getPokemonList(res.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonList = async (res, err) => {
    try {
      res?.map(async (pokemon) => {
        const result = await Axios.get(pokemon.url);
        // console.log("list", pokemonList);
        setPokemonList((pokemon) => {
          pokemon = [...pokemon, result.data];
          pokemon.sort((a, b) => (a.id > b.id ? 1 : -1));
          return pokemon;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    pokeGet();
  }, [pokemonSet]);

  function goNext() {
    setPokemonList([]);
    setPokemonSet(nextPokemonSet);
  }

  function goPrevious() {
    if (prevPokemonSet === null) {
      return;
    } else {
      setPokemonList([]);
      setPokemonSet(prevPokemonSet);
    }
  }

  function handleSearch(e) {
    setSearchInput(e.target.value.toLowerCase());
  }

  function handleSelect(e) {
    setSelectValue(e.target.value);
  }

  useEffect(() => {
    if (selectValue === "1") {
      setPokemonList([...pokemonList].sort((a, b) => (a.id > b.id ? -1 : 1)));
    } else if (selectValue === "0") {
      setPokemonList([...pokemonList].sort((a, b) => (a.id > b.id ? 1 : -1)));
    }
  }, [selectValue]);

  function setViewOption() {
    if (isGrid === true) {
      setIsGrid(false);
      setView("LIST VIEW");
    } else {
      setIsGrid(true);
      setView("GRID VIEW");
    }
  }

  return (
    <>
      <PokemonListContainer
        pokemonList={pokemonList}
        isLoading={isLoading}
        goNext={goNext}
        goPrevious={goPrevious}
        handleSearch={handleSearch}
        searchInput={searchInput}
        handleSelect={handleSelect}
        setViewOption={setViewOption}
        isGrid={isGrid}
        view={view}
      />
    </>
  );
}

export default App;
