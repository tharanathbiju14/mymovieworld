import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetchTMDB from '../components/tmbdfetch'; 
import { CircularProgress, Grid, Card, CardMedia, CardContent, Typography, Pagination } from '@mui/material';
import './pages.css'; 
import SidebarDrawer from '../components/drawer';

const GenreMoviesPage = () => {
  const { id } = useParams(); 
  const [page, setPage] = useState(1); 
  const { data, loading, error } = useFetchTMDB('/discover/movie', { with_genres: id, page: page });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No movies found.</p>;

  return (
    <div style={{ padding: '20px' }}>
        <SidebarDrawer/>
      <p style={{color:"white",fontSize:"30px",marginLeft:"50px",padding:"30px"}}>Movies in this Genre</p>
      <div className="movie-container">
        {data.results.map((movie) => (
          <div key={movie.id} className="movie-card" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-card-image"
                style={{height: '90%'}}
              />
              <p className="movie-card-title" style={{color:"white",padding:"8px"}}>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>

      
      <div className="pagination-buttons">
        <Pagination
          count={data.total_pages} 
          page={page} 
          onChange={handlePageChange} 
          size="large"
        />
      </div>
    </div>
  );
};

export default GenreMoviesPage;
