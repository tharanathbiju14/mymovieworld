import { useState, useEffect } from 'react';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDJmZjQ3OWU0YTAzM2M5YTNjZmU3Mzg4YTMxOGEwOSIsIm5iZiI6MTczMTY1MTUyMy45NTMwNDk3LCJzdWIiOiI2NzM1ODI1YzI5NTRkMjY0NzYyNTc3NDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdPtSXNJ4xN51ELysub6YQ11t_y-qMchV9UuzOVgt9g';
const BASE_URL = 'https://api.themoviedb.org/3';

function useFetchTMDB(endpoint, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(params);

      try {
        // Fetch the main movie data
        const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching movie details: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);

        // Fetch the trailer if the movie has a valid ID
        if (result.id) {
          // Fetch trailer data
          const videoResponse = await fetch(`${BASE_URL}/movie/${result.id}/videos`, {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          });
          const videoResult = await videoResponse.json();
          if (videoResult.results && videoResult.results.length > 0) {
            const trailerVideo = videoResult.results.find(video => video.type === 'Trailer');
            setTrailer(trailerVideo);
          } else {
            setTrailer(null); // No trailers found
          }

          // Fetch streaming provider data
          const providersResponse = await fetch(`${BASE_URL}/movie/${result.id}/watch/providers`, {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          });
          const providersResult = await providersResponse.json();
          if (providersResult.results) {
            const countryProviders = providersResult.results.US || providersResult.results.IN; // Adjust for desired region
            setProviders(countryProviders ? countryProviders.flatrate || [] : []);
          } else {
            setProviders([]);
          }
        } else {
          setTrailer(null);
          setProviders([]);
        }

      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error, trailer, providers };
}

export default useFetchTMDB;
