import { useState, useEffect, useRef } from "react";
import useFetchTMDB from "./tmbdfetch";
import "./carousel.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material'; 

export default function Carousel() {
  const [carousel, setCarousel] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null); 
  const navigate = useNavigate();

  const { data, loading, error } = useFetchTMDB("/trending/movie/day", {
    language: "en-US",
  });

  useEffect(() => {
    if (data && data.results) {
      
      const movies = data.results;
      setCarousel([...movies, ...movies, ...movies]);
      setCurrentIndex(movies.length); 
    }
  }, [data]);

  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [carousel]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };


  
  useEffect(() => {
    if (carouselRef.current) {
      const totalMovies = carousel.length / 3;
      if (currentIndex >= totalMovies * 2) {
        
        setTimeout(() => {
          carouselRef.current.style.transition = "none";
          setCurrentIndex(totalMovies);
        }, 500);
      } else if (currentIndex < totalMovies) {
       
        setTimeout(() => {
          carouselRef.current.style.transition = "none";
          setCurrentIndex(totalMovies * 2 - 1);
        }, 500);
      } else {
        carouselRef.current.style.transition = "transform 0.5s ease";
      }
    }
  }, [currentIndex, carousel.length]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={60} /> 
      </div>
    );
  }
  
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={handlePrev}>
        &#9664;
      </button>

      <div className="carousel-wrapper">
        <div
          ref={carouselRef}
          className="carousel"
          style={{
            transform: `translateX(-${currentIndex * 220}px)`,
          }}
        >
          {carousel.map((movie, index) => (
            <div className="carousel-item" key={`${movie.id}-${index}`}  onClick={() => handleMovieClick(movie.id)}>
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

      <button className="carousel-button next" onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
}
