import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import usePaginatedFetchTMDB from '../components/tmbdfetch';
import "./searchresults.css";
import SidebarDrawer from '../components/drawer';
import { CircularProgress } from '@mui/material'; 

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('query') || '';
  const { data, loading, error } = usePaginatedFetchTMDB('/search/movie', { query });

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); 
  };

 
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={60} /> 
      </div>
    );
  }
  
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.results || data.results.length === 0) {
    return <p>No movies found for "{query}".</p>;
  }

  return (
    <div className="search-results-container">
      <SidebarDrawer />
      <p style={{ fontSize: "30px", color: "white", padding: "10px 60px", marginBottom: "30px" }}>
        Search Results for "{query}"
      </p>
      <div className="movie-list">
        {data.results.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)} 
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <p style={{ color: "white", marginTop: "15px" }}>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
