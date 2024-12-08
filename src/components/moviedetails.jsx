import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchTMDB from './tmbdfetch';
import './moviedetails.css'; // Update this file to match the Netflix style
import SidebarDrawer from './drawer';
import { CircularProgress } from '@mui/material';

export default function MovieDetails() {
  const { id } = useParams();
  const { data, loading, error, trailer, providers } = useFetchTMDB(`/movie/${id}`, { language: 'en-US' });

    const handlePlayClick = () => {
    if (providers && providers.length > 0) {
      const firstProvider = providers[0]; // Pick the first provider for simplicity
      const providerLink = `https://www.${firstProvider.provider_name.toLowerCase().replace(/\s+/g, '')}.com`; // Adjust URL logic based on API response
      window.open(providerLink, '_blank');
    } else {
      alert("No streaming providers available for this movie.");
    }
  };

  console.log("Movie Data:", data);
  console.log("Trailer Data:", trailer);
  console.log("Providers Data:", providers);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No details found.</p>;

  return (
    <div className="movie-details-container">
      <SidebarDrawer />
      <div
        className="movie-background"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
      >
        <div className="movie-overlay"></div>
        <div className="movie-content">
          <div className="movie-poster-wrapper">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              className="movie-poster"
              style={{width:"400px",height:"500px",position:"fixed"}}
            />
          </div>
          <SidebarDrawer/>
          <div className="movie-details">
            <h1 style={{fontFamily:"'Montserrat', sans-serif"}}>{data.title}</h1>
            <p className="movie-metadata" style={{fontFamily:"'Montserrat', sans-serif"}}>
              {data.release_date.split('-')[0]} | {data.runtime} mins | {data.adult ? '18+' : 'PG-13'}
            </p>
            <div className="movie-rating" style={{fontFamily:"'Montserrat', sans-serif"}}>
              ⭐ {data.vote_average.toFixed(1)} / 10
            </div>
            <p className="movie-overview" style={{fontFamily:"'Montserrat', sans-serif",fontSize:"20px"}}>{data.overview}</p>
            <div className="movie-buttons">
              <button className="play-button" onClick={handlePlayClick} style={{fontFamily:"'Montserrat', sans-serif"}}>▶ Play</button>
              {data.homepage && (
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="more-info-button"
                  style={{fontFamily:"'Montserrat', sans-serif"}}
                >
                  More Info
                </a>
              )}
            </div>
            {trailer && (
              <div className="movie-trailer">
                <iframe
                  title="movie trailer"
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <div className="streaming-providers">
            <h2 style={{fontFamily:"'Montserrat', sans-serif"}} >Streaming Providers</h2>
            {providers.length > 0 ? (
              <ul className="providers-list" style={{marginTop:"20px"}}>
                {providers.map(provider => (
                  
                  <li key={provider.provider_id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                    />
                    {/* <span>{provider.provider_name}</span> */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No streaming providers available</p>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
