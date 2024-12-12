
import "./App.css";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";

function App(){
   return <div className="app">
    <Navbar/>
    <div className="main">
      <CharacterList/>
      <CharacterDetails/>
    </div>
  </div>
}
export default App