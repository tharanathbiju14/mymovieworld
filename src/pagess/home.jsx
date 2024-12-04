import Carousel from "../components/carousel";
import SidebarDrawer from "../components/drawer";
import MoviesCarousel from "../components/popular";
import Toprated from "../components/toprated";
import Upcoming from "../components/upcoming";
import "./home.css";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function Homepage() {

  const [query, setQuery] = useState(""); 
  const navigate = useNavigate(); 

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`); 
    } else {
      alert("Please enter a movie name to search."); 
    }
  };
  
  return (
    <>
      <nav>
        <div className="logo">
          <div className="bar"><SidebarDrawer/></div>
          <div className="title">
            <h1>onstream</h1>
          </div>
        </div>
        <div className="navitems">
          <input type="text" placeholder="search movies"  value={query}
            onChange={(e) => setQuery(e.target.value)}/>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}  onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
      </nav>

      <div className="carouselhome">
        <div className="trending"><p style={{marginTop:"20px"}}>Trending now</p></div>
        <div className="carouselcomp">
          <Carousel />
        </div>
        <div className="trending"><p style={{marginTop:"30px"}}>popular</p></div>
        <div className="carouselcomp">
          <MoviesCarousel />
        </div>
        <div className="trending"><p style={{marginTop:"40px"}}>Top Rated</p></div>
        <div className="carouselcomp">
          <Toprated/>
        </div>
        <div className="trending"><p style={{marginTop:"40px"}}>Upcoming</p></div>
        <div className="carouselcomp">
          <Upcoming/>
        </div>
      </div>
    </>
  );
}
