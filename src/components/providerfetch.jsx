import { useState, useEffect } from "react";

const useMovieProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "eyJhdWQiOiI4ZDJmZjQ3OWU0YTAzM2M5YTNjZmU3Mzg4YTMxOGEwOSIsIm5iZiI6MTczMTY1MTUyMy45NTMwNDk3LCJzdWIiOiI2NzM1ODI1YzI5NTRkMjY0NzYyNTc3NDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0";
  const ENDPOINT = `https://api.themoviedb.org/3/watch/providers/movie`;

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ENDPOINT}?api_key=${API_KEY}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie providers");
        }
        const data = await response.json();
        setProviders(data.results); 
      } catch (err) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  return { providers, loading, error };
};

export default useMovieProviders;
