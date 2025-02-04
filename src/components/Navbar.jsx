import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";
export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />

      {children}
    </nav>
  );
}

function Logo() {
  return <div className="navbar__logo">LOGO</div>;
}
export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      className="text-field"
      placeholder="search..."
    />
  );
}
export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Find {numOfResult} Character</div>;
}
export function Favorite({ favorite, onDeleteFavorite  }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="List Of Favorite">
        {favorite.map((item) => (
          <Character
            key={item.id}
            item={item}
          
          >
             <button
            className="icon red"
            onClick={() => onDeleteFavorite(item.id)}
          >
          <TrashIcon /> 
          </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorite.length}</span>
      </button>
    </>
  );
}
