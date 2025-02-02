import { useEffect, useState } from "react";

import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
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

  return (
    <div className="app">
      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={character.length} />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={character}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectedCharacter}
        />
        <CharacterDetails selectedId={selectedId} />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
