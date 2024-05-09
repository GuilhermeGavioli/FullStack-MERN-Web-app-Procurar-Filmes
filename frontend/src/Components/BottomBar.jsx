import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { grey, amber } from '@mui/material/colors';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useNavigate } from 'react-router-dom';


export default function BottomBar() {
  const navigator = useNavigate()
  const [value, setValue] = React.useState('Home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function goToMain(){
    navigator('/')
  }

  function goToMyComments(){
    navigator('/mycomments')
  }

  return (
    <BottomNavigation color="red" sx={{ background: grey[900], position: 'fixed',bottom: 0, width: '100vw', zIndex: 10  }} value={value} onChange={handleChange}>
      <BottomNavigationAction 
      onClick={()=> {goToMain()}}
        primary={'red'}
        secondary={'blue'}
        sx={{color: amber[700]}}
        icon={<HomeIcon sx={{ width: '35px', color: 'purple'}}  onClick={()=> {goToMain()}}/>}
        // icon={value === 'home' ? <HomeIcon sx={{ width: '35px' }} color="white" /> : <HomeOutlinedIcon sx={{ width: '35px' }} />}
    
      />
      <BottomNavigationAction  onClick={()=> {goToMyComments()}}
        icon={<InsertCommentIcon />}
      />
  
      {/* <BottomNavigationAction icon={<FolderIcon />} /> */}
    </BottomNavigation>
  );
}