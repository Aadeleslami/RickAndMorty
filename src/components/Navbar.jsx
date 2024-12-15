import { HeartIcon } from "@heroicons/react/24/outline";
export default function Navbar({children}) {
  return (
    <nav className="navbar">
      <Logo />
      <Search />
      {children}
      <Button />
    </nav>
  );
}

function Logo() {
  return <div className="navbar__logo">LOGO</div>;
}
function Search() {
  return <input type="text" className="text-field" placeholder="search..." />;
}
export function SearchResult({numOfResult}) {
  return <div className="navbar__result">Find {numOfResult} Character</div>;
}
function Button() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">4</span>
    </button>
  );
}
