import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";

function App() {
  const [character, setCharacter] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar  >
        <SearchResult numOfResult={character.length}/>
      </Navbar>
      <Main >
      <CharacterList characters={character} />
      <CharacterDetails />
      </Main>
    </div>
  );
}
export default App;

function Main({children}) {
  return (
    <div className="main">
      {children}
    </div>
  );
}
