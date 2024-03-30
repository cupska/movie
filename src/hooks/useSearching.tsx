import axios from "axios";
import { useEffect, useState } from "react";

function useSearching({ defaultQuery }: { defaultQuery?: string }) {
  const [query, setQuery] = useState<string>(defaultQuery ?? "");
  const [result, setResult] = useState<{ results: { name: string }[] }>();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/keyword?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${query}`
      );
      setResult(res.data);
    };
    fetch();
  }, [query]);
  return { setQuery, result: result?.results?.map((dat) => dat.name) }; //|| [""] };
}
export { useSearching };
