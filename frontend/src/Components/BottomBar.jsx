import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { grey } from '@mui/material/colors';

export default function BottomBar() {
  const [value, setValue] = React.useState('Home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation color="red" sx={{ background: grey[900], position: 'fixed',bottom: 0, width: '100vw', zIndex: 10  }} value={value} onChange={handleChange}>
      <BottomNavigationAction 
        label="Home"
        color="red"
        icon={value === 'home' ? <HomeIcon sx={{ width: '35px' }} color="white" /> : <HomeOutlinedIcon sx={{ width: '35px' }} />}
    
      />
      <BottomNavigationAction 
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
     
      <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}