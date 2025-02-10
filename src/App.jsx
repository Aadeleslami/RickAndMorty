import { useEffect, useState } from "react";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorite, Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, character } = useCharacters(
    "https://rickandmortyapi.com/api/character?name",
    query
  );

  const [selectedId, setSelectedId] = useState(null);
  const[favorite,setFavorite]=useLocalStorage("FAVORITE",[])
  // useEffect(() => {
  //   const interval = setInterval(() => setCount((c) => c + 1), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);
  const handleSelectedCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleAddToFavorite = (char) => {
    setFavorite((prevFav) => [...prevFav, char]);
  };
  const handleDeleteFavorite = (id) => {
    setFavorite((preFav) => preFav.filter((fav) => fav.id !== id));
  };
  const isAddedToFavorite = favorite.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="app">
      {/* <div style={{ color: "#ffff" }}>{count}</div> */}
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={character.length} />
        <Favorite favorite={favorite} onDeleteFavorite={handleDeleteFavorite} />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={character}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectedCharacter}
        />
        <CharacterDetails
          selectedId={selectedId}
          onAddToFavorite={handleAddToFavorite}
          isAddedToFavorite={isAddedToFavorite}
        />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
