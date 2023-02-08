import { useEffect, useState } from "react";
import PokemonDetailsContainer from "./components/PokemonDetailsContainer";
import PokemonListContainer from "./components/PokemonListContainer";
import style from "./css/style.css";
import Axios from "axios";

export const URL = process.env.REACT_APP_SERVER_URL;

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
  const [pokemonData, setPokemonData] = useState("");
  const [pokemonURL, setPokemonURL] = useState("");
  const [favoritePokemonList, setFavoritePokemonList] = useState([]);
  const [favePokemon, setFavePokemon] = useState([]);

  // console.log("pokemonData", pokemonData.id);
  // console.log(
  //   "favoritePokemon",
  //   !favePokemon ? "" : favePokemon?.map((pokemon) => pokemon.id)
  // );
  const pokemonDataID = pokemonData.id;
  console.log("pokemonDataID", pokemonDataID);
  const favePokemonId = !favePokemon
    ? ""
    : favePokemon?.map((pokemon) => pokemon.id);
  console.log("favePokemonId", favePokemonId);

  // getting pokemon list URL
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

  // getting pokemonlist from URL
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

  // function for searching pokemon
  function handleSearch(e) {
    setSearchInput(e.target.value.toLowerCase());
  }

  // function for sorting pokemonlist
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

  // function for changing view (list/grid)

  function setViewOption() {
    if (isGrid === true) {
      setIsGrid(false);
      setView("LIST VIEW");
    } else {
      setIsGrid(true);
      setView("GRID VIEW");
    }
  }

  // getting pokemon detail on select
  function pokemonDetail(pokemon) {
    setPokemonData(pokemon);
  }

  // getting pokemon detail on search
  const getPokemonSearch = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput}`).then(
      (response) => (!response.data ? "" : setPokemonData(response.data))
    );
  };

  // getting url of favorite pokemon
  function getFavoritePokemon(pokemon) {
    setPokemonURL(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }

  // console.log(
  //   "compare",
  //   !favePokemonId ? "" : favePokemonId.filter((id) => id == pokemonData.id)
  // );

  // adding favorite pokemon in DB
  const addFavoritePokemon = async (e) => {
    e.preventDefault();
    // if (pokemonURL === "") {
    //   return console.log("cant be empty");
    // }
    if (favePokemonId.includes(pokemonDataID) === true) {
      console.log("already on the list");
      window.alert("already on the list");
      console.log("compare", favePokemonId.includes(pokemonDataID));
    } else {
      try {
        await Axios.post(`${URL}/api/pokemon`, {
          pokemonURL: { pokemonURL: pokemonURL },
        });
        console.log("added to favorite");
        FavoritePokemonList();
        setFavoritePokemonList("");
      } catch (error) {
        console.log(error.message);
        console.log("pokemonURL", pokemonURL);
      }
    }
  };

  // getting all favorites
  const FavoritePokemonList = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(`${URL}/api/pokemon`);
      setFavoritePokemonList(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FavoritePokemonList();
  }, []);

  const getFavPokemonList = async (res, err) => {
    try {
      favoritePokemonList?.map(async (pokemon) => {
        const result = await Axios.get(pokemon.pokemonURL);
        // console.log("list", pokemonList);
        setFavePokemon((pokemon) => {
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
    setFavePokemon("");
    getFavPokemonList();
  }, [favoritePokemonList]);
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
        pokemonData={pokemonData}
        pokemonDetail={pokemonDetail}
        getPokemonSearch={getPokemonSearch}
        pokemonURL={pokemonURL}
        getFavoritePokemon={getFavoritePokemon}
        addFavoritePokemon={addFavoritePokemon}
        favePokemon={favePokemon}
        getFavPokemonList={getFavPokemonList}
      />
    </>
  );
}

export default App;
