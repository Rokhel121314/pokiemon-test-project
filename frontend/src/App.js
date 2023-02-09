import { useEffect, useState } from "react";
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
  const [createTeam, setCreateTeam] = useState([]);
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [teamUrl, setTeamUrl] = useState({});
  const [eachTeamURLS, setEachTeamURLS] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [dataSet, setDataSet] = useState([]);

  const pokemonDataID = pokemonData.id;

  const favePokemonId = !favePokemon
    ? ""
    : favePokemon?.map((pokemon) => pokemon.id);

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
    if (searchInput.length === 0) {
      window.alert("please input pokemon name!");
    } else {
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput}`).then(
        (response) => (
          !response.data ? "" : setPokemonData(response.data),
          getFavoritePokemon(response.data.name)
        )
      );
    }
  };

  // getting url of favorite pokemon
  function getFavoritePokemon(pokemon) {
    setPokemonURL(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }

  // adding favorite pokemon in DB
  const addFavoritePokemon = async (e) => {
    e.preventDefault();
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

  // CREATING TEAM

  const teamList = createTeam.map((p) => {
    return p.pokemonURL;
  });

  function addToTeam() {
    console.log("compare", teamList.includes(pokemonURL), pokemonURL);

    if (teamList.includes(pokemonURL) === true) {
      window.alert("already in your team");
    } else {
      if (createTeam.length < 4) {
        setCreateTeam([...createTeam, { pokemonURL }]);
      } else {
        window.alert("you already have 4 pokemon on the team");
      }
    }
  }

  const getPokemonTeamList = async (res, err) => {
    try {
      createTeam?.map(async (pokemon) => {
        const result = await Axios.get(pokemon.pokemonURL);
        setPokemonTeam((pokemon) => {
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
    setPokemonTeam("");
    getPokemonTeamList();
  }, [createTeam.length]);

  // adding favorite pokemon in DB
  const savePokemonTeam = async (e) => {
    e.preventDefault();
    if (createTeam.length < 4) {
      window.alert(`add ${4 - createTeam.length} more pokemon`);
    } else if (createTeam.length === 4) {
      try {
        await Axios.post(`${URL}/api/team`, {
          createTeam: { teamURL: createTeam },
        });
        console.log("added to team");
        window.location.reload();
      } catch (error) {
        console.log(error.message);
        console.log("createTeam", createTeam);
      }
    }
  };

  // getting teamdata from DB
  const getPokemonTeam = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(`${URL}/api/team`);
      setTeamUrl(data.map((pokemon) => pokemon.teamURL));
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  // getting team URL
  const getPokemonTeamURL = async () => {
    setIsLoading(true);
    try {
      const { data } = await Axios.get(`${URL}/api/team`);
      const dataArray = data.map((url) => url.teamURL);
      const urlArray = dataArray.map((data) =>
        data.map((d) => {
          return d.pokemonURL;
        })
      );
      setEachTeamURLS(urlArray);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  // getting pokemonlist from URL
  const getTeamData = async () => {
    try {
      let urls = [];

      for (let i = 0; i < eachTeamURLS.length; i++) {
        const array = eachTeamURLS[i];
        for (let j = 0; j < array.length; j++) {
          const urls = array[j];
          // console.log("urls", urls);
          const result = await Axios.get(urls);
          setTeamData((pokemon) => {
            pokemon = [...pokemon, result.data];
            return pokemon;
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeamData();
  }, [eachTeamURLS.length]);

  useEffect(() => {
    getPokemonTeam();
    getPokemonTeamURL();
  }, []);

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
        addToTeam={addToTeam}
        pokemonTeam={pokemonTeam}
        savePokemonTeam={savePokemonTeam}
        teamUrl={teamUrl}
        teamData={teamData}
      />
    </>
  );
}

export default App;
