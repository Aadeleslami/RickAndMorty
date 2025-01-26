import { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";

function App() {
  const [character, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setCharacter(data.results.slice(0, 5));
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Navbar>
        <SearchResult numOfResult={character.length} />
      </Navbar>
      <Main>
        <CharacterList characters={character} isLoading={isLoading} />
        <CharacterDetails />
      </Main>
    </div>
  );
}
export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
