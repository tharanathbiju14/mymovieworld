import Homepage from "./pagess/home";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetails from "./components/moviedetails";
import Popular from "./pagess/popmovies";
import Upcoming from "./pagess/upcomingmov";
import TopRated from "./pagess/topratedmov";
import SearchResults from "./pagess/searchresults";
import GenreMoviesPage from "./pagess/genremoviespage";


export default function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> 
        <Route path="/genre/:id" element={<GenreMoviesPage />} />
        
       
      </Routes>
    </Router>
    </>
  );
}