import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url,query){
     const [character, setCharacter] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
          try {
            setIsLoading(true);
            const { data } = await axios.get(
              `${url}=${query}`,
              { signal }
            );
            setCharacter(data.results.slice(0, 5));
          } catch (err) {
            
           setCharacter([])
              toast.error(err.response.data.error);
          
          } finally {
            setIsLoading(false);
          }
        }
        
        fetchData();
        return () => {
          controller.abort();
        };
      }, [query]);
      return {isLoading , character}
}