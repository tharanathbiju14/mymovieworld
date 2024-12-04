import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, CircularProgress, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import useFetchTMDB from './tmbdfetch'; 

const SidebarDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Popular Movies', path: '/popular' },
    { text: 'Top Rated', path: '/top-rated' },
    { text: 'Upcoming', path: '/upcoming' },
    { text: 'Favorites', path: '/favorites' },
  ];

  const { data: genreData, loading, error } = useFetchTMDB('/genre/movie/list', {});

  const toggleDrawer = (open) => () => {
    setIsOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          paddingTop: '30px',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.0)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#000000',
            color: 'white',
            fontFamily: "'Montserrat', sans-serif",
          },
        }}
      >
        <Box
          sx={{ width: 250, padding: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => handleNavigation(item.path)} style={{ cursor: 'pointer' }}>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    style: { fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 500 },
                  }}
                />
              </ListItem>
            ))}
          </List>

          
          <List>
            <ListItem>
              <ListItemText
                primary="Genres"
                primaryTypographyProps={{
                  style: { fontFamily: "'Montserrat', sans-serif", fontSize: '18px', fontWeight: 600 },
                }}
              />
            </ListItem>

            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <CircularProgress color="inherit" />
              </Box>
            ) : error ? (
              <Typography variant="body2" color="error" sx={{ textAlign: 'center', padding: '10px' }}>
                Error: {error}
              </Typography>
            ) : (
              genreData?.genres?.map((genre) => (
                <ListItem button key={genre.id} onClick={() => handleNavigation(`/genre/${genre.id}`)} style={{ cursor: 'pointer' }}>
                  <ListItemText
                    primary={genre.name}
                    primaryTypographyProps={{
                      style: { fontFamily: "'Montserrat', sans-serif", fontSize: '16px', fontWeight: 500 },
                    }}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SidebarDrawer;
