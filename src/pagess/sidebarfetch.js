import { useState, useEffect } from 'react';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDJmZjQ3OWU0YTAzM2M5YTNjZmU3Mzg4YTMxOGEwOSIsIm5iZiI6MTczMTY1MTUyMy45NTMwNDk3LCJzdWIiOiI2NzM1ODI1YzI5NTRkMjY0NzYyNTc3NDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdPtSXNJ4xN51ELysub6YQ11t_y-qMchV9UuzOVgt9g';
const BASE_URL = 'https://api.themoviedb.org/3';

function usePaginatedFetchTMDB(endpoint, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({ ...params, page });

      try {
        const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, page, JSON.stringify(params)]);

  return { data, loading, error, page, setPage };
}

export default usePaginatedFetchTMDB;
