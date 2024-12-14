
import { useState } from "react";
import { allCharacters } from "../data/data";
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App() {
  const [character, setCharacter] = useState(allCharacters);
  return (
    <div className="app">
      <Navbar numOfResult={character.length} />
      <div className="main">
        <CharacterList characters={character} />
        <CharacterDetails />
      </div>
    </div>
  );
}
export default App;
