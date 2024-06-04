import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import HomeIcon from '@mui/icons-material/Home';

import { grey, amber, pink } from '@mui/material/colors';
import InsertCommentIcon from '@mui/icons-material/InsertComment';

import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Skeleton } from '@mui/material';
import { theme } from '../../theme';


import { AuthContext } from '../Contexts/AuthContext';



export default function BottomBar() {
  const {user, userLoading, iconInitialState, goTo } = React.useContext(AuthContext)


  return (

 

    <div style={{
        position: 'fixed', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'space-evenly', 
        borderRadius: '10px',
        inset: 'auto 0 10px 0',
       margin: 'auto',
       padding: '10px',
        overflow: 'hidden',
        boxShadow: 'none',
    }}>

    
    <BottomNavigation
     sx={{ 
       width: '100%', zIndex: 10, display: 'flex', justifyContent: 'space-evenly', 
       borderRadius: '10px',
       boxShadow: 'none',
      margin: 'auto',

       background: 'white',
       overflow: 'hidden'
       }}>
     
      <Box value={0} sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}} 
      onClick={() => {goTo('/')}}>
        {/* <HomeIcon sx={{fontSize: '1.9em', color: theme.palette.purple_selected_icon}}/> */}
        <HomeIcon sx={{
          fontSize: iconInitialState == 0 ? '1.5em' : '1.4em', 
          color: iconInitialState == 0 ? theme.palette.purple_selected_icon : theme.palette.dark,
          background: iconInitialState == 0 ? 'rgb(245,238,255)' : 'none',
          }}/>
      </Box>

      <Box value={1} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}} 
      onClick={()=> {goTo('/mycomments')}}>
        <InsertCommentIcon  
        sx={{
          fontSize: iconInitialState == 1 ? '1.5em' : '1.4em', 
          color: iconInitialState == 1 ? theme.palette.purple_selected_icon : theme.palette.dark
          }}/>
      </Box>
  
      <Box value={2} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}}
       onClick={()=> {goTo('/results')}}>
        <SearchIcon  sx={{
          fontSize: iconInitialState == 2 ? '1.5em' : '1.4em', 
          color: iconInitialState == 2 ? theme.palette.purple_selected_icon : theme.palette.dark
          }}/>
      </Box>

      <Box value={2} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}}
       onClick={()=> {goTo('/profile/me')}}>

      {
        userLoading ? 
        <Skeleton animation="wave" variant="circular" width={24} height={24} sx={{bgcolor: grey[300]}} />
        :
        <Avatar
        alt="Remy Sharp"
        src={user.picture}
        sx={{ width: 24, height: 24 }}
      />
      }
      
      </Box>
      
    </BottomNavigation>
    </div>


  )
}