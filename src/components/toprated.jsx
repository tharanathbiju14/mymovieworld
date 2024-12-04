import useFetchTMDB from './tmbdfetch';
import './carousel.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Toprated() {
  const { data, loading, error } = useFetchTMDB('/movie/top_rated', { language: 'en-US', page: 1 });
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const carousel = data?.results || [];
  const itemWidth = 220; 
  const visibleItems = 5; 
  const maxIndex = Math.max(0, carousel.length - visibleItems);

  const handlePrev = () => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  const handleNext = () => setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={handlePrev} disabled={currentIndex === 0}>
          &#9664;
        </button>
        <div className="carousel-wrapper">
          <div className="carousel" style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}>
            {carousel.map((movie) => (
              <div
                className="carousel-item"
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="carousel-img"
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-button next" onClick={handleNext} disabled={currentIndex === maxIndex}>
          &#9654;
        </button>
      </div>
    </>
  );
}
