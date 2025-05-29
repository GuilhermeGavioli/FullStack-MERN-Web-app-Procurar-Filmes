
import BottomNavigation from '@mui/material/BottomNavigation';
import HomeIcon from '@mui/icons-material/Home';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SearchIcon from '@mui/icons-material/Search';
import {  Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { ThemeContext } from '../Contexts/ThemeContext';
import { LocationContext } from '../Contexts/LocationContext';

import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

export default function BottomBar() {
    const {currentTheme} = useContext(ThemeContext)
    
    const location = useLocation()
    const {iconInitialState, goTo } = useContext(LocationContext)

  return (

    <div style={{
        position: 'fixed', width: '100%', zIndex: 10, display: 'flex', 
        justifyContent: 'space-evenly',
       
        borderRadius: '10px',
        inset: 'auto 0 0 0',
       padding: '10px',
        overflow: 'hidden',
        boxShadow: 'none',
       
    }}>

    
    <BottomNavigation
     sx={{ 


       width: '100%',
       transition: '0.3s ease-in-out',
       zIndex: 10, display: 'flex', justifyContent: 'space-evenly', 
       borderRadius: '10px',
       boxShadow: 'none',
      margin: 'auto',
      padding: '0px',
       background: currentTheme.palette.bars,
       overflow: 'hidden'
       }}>
     
      <Box value={0} sx={{ display: 'flex' , justifyContent:'center', alignItems: 'center', width: '25%'}} 
      onClick={() => {goTo('/')}}>
       
        <HomeIcon sx={{
          fontSize: iconInitialState == 0 && location.pathname !== '/profile/me' ? '1.8em' : '1.7em', 
          color: iconInitialState == 0 && location.pathname !== '/profile/me'  ? currentTheme.palette.sec : currentTheme.palette.bottom_bar_icon,
          // background: iconInitialState == 0 ? 'rgb(245,238,255)' : 'none',
          }}/>
      </Box>

      <Box value={1} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}} 
      onClick={()=> {goTo('/mycomments')}}>
        <InsertCommentIcon  
        sx={{
          fontSize: iconInitialState == 1 && location.pathname !== '/profile/me' ? '1.8em' : '1.7em', 
          color: iconInitialState == 1 && location.pathname !== '/profile/me' ? currentTheme.palette.sec : currentTheme.palette.bottom_bar_icon
          }}/>
      </Box>
  
      <Box value={2} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}}
       onClick={()=> {goTo('/results')}}>
        <SearchIcon  sx={{
          fontSize: iconInitialState == 2 && location.pathname !== '/profile/me' ? '1.8em' : '1.7em', 
          color: iconInitialState == 2 && location.pathname !== '/profile/me' ? currentTheme.palette.sec : currentTheme.palette.bottom_bar_icon
          }}/>
      </Box>

      <Box value={3} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}}
       onClick={()=> {goTo('/settings')}}>

   
        <SettingsIcon
        sx={{
          fontSize: iconInitialState == 3 && location.pathname !== '/profile/me' ? '1.8em' : '1.7em', 
          color: iconInitialState == 3 && location.pathname !== '/profile/me' ? currentTheme.palette.sec : currentTheme.palette.bottom_bar_icon
          }}
      />
      
      
      </Box>

    
      
    </BottomNavigation>
    </div>


  )
}