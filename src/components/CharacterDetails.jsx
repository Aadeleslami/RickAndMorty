import {

  ArrowUpCircleIcon,
  CheckCircleIcon,
 
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SkeletonCharacter } from "./SkeletonLoader";

function CharacterDetails({ selectedId, onAddToFavorite, isAddedToFavorite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );

        setEpisodes([episodeData].flat().slice(0, 5));
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) return <SkeletonCharacter />;

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        Please Select Character
      </div>
    );
  return (
    <div style={{ flex: 1 }}>
    
<CharacterSubInfo character={character} isAddedToFavorite={isAddedToFavorite} onAddToFavorite={onAddToFavorite}/>
   <EpisodesList episodes={episodes}/>
    </div>
  );
}

export default CharacterDetails;

function CharacterSubInfo ({character, isAddedToFavorite, onAddToFavorite}){
return(
  <div className="character-detail">
  <img
    src={character.image}
    alt={character.name}
    className="character-detail__img"
  />
  <div className="character-detail__info">
    <h3 className="name">
      <span>{character.gender === "Male" ? "👨‍💼" : "👩‍💼"}</span>
      <span>&nbsp;{character.name}</span>
    </h3>
    <div className="info">
      <span
        className={`status ${character.status === "Dead" ? "red" : ""}`}
      ></span>
      <span>&nbsp;{character.status}</span>
      <span> -&nbsp;{character.species}</span>
    </div>
    <div className="location">
      <p>Last known location: </p>
      <p>{character.location.name}</p>
    </div>
    <div className="actions">
      {isAddedToFavorite ? (
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Already Add To Favorites{" "}
          <CheckCircleIcon height={32} width={32} color="green" />{" "}
        </p>
      ) : (
        <button
          onClick={() => onAddToFavorite(character)}
          className="btn btn--primary"
        >
          Add to Favorite
        </button>
      )}
    </div>
  </div>
</div>
)
}
function EpisodesList ({episodes}){
  const[sortBy,setSortBy] = useState(true);
  let episodeSort ;
  if(sortBy)  episodeSort = [...episodes].sort((a,b)=> new Date(a.created) - new Date(b.created))
    else episodeSort = [...episodes].sort((a,b)=> new Date(b.created) - new Date(a.created))
 

  return(
    <div className="character-episodes">
    <div className="title">
      <h2>List Of Episodes:</h2>
      <button onClick={()=>setSortBy(is => !is)}>
        <ArrowUpCircleIcon className="icon" style={{rotate:sortBy ? "0deg":"180deg"}} />
      </button>
    </div>
    <ul>
      {episodeSort.map((item, index) => (
        <li key={item.id}>
          <div>
            {String(index + 1).padStart(2, "0")} {item.episode}:
            <strong> {item.name}</strong>
          </div>
          <div className="badge badge--secondary">{item.air_date}</div>
        </li>
      ))}
    </ul>
  </div>
  )
}