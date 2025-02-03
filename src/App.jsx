import { useEffect, useState } from "react";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorite, Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorite , setFavorite] =useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacter(data.results.slice(0, 5));
      } catch (err) {
        setCharacter([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setCharacter([]);
      return;
    }
    fetchData();
  }, [query]);
  const handleSelectedCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };
  const handleAddToFavorite = (char)=>{
    setFavorite(prevFav => [...prevFav,char])
  }
  const isAddedToFavorite = favorite.map(fav => fav.id).includes(selectedId)
console.log(favorite);

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={character.length} />
        <Favorite numOfFavorite={favorite.length} />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={character}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectedCharacter}
          
        />
        <CharacterDetails selectedId={selectedId} 
        onAddToFavorite={handleAddToFavorite}
        isAddedToFavorite={isAddedToFavorite}/>
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
