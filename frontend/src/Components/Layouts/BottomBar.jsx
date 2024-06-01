import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { grey, amber, pink } from '@mui/material/colors';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Skeleton } from '@mui/material';
import { theme } from '../../theme';


import { AuthContext } from '../Contexts/AuthContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function BottomBar() {
  const {user, userLoading } = React.useContext(AuthContext)
  const location = useLocation();

  const navigator = useNavigate()

  const [iconInitialState, setIconInitialState] = React.useState('');
  const [page, setPage] = React.useState('');

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname == '/'){
      setIconInitialState(0)
    } else if (pathname == '/mycomments'){
      setIconInitialState(1)
    } else if (pathname == '/results'){
      setIconInitialState(2)
    } else if (pathname == '/profile/me'){
      setIconInitialState(3)
    }

  }, [page])

  function goToMain(){
    setPage('/')
    navigator('/')
  }
  
  function goToMyComments(){
    setPage('/mycomments')
    navigator('/mycomments')
  }
  
  function goToResults(){
    setPage('/results')
    navigator('/results')
  }

  function goToProfile(){
    setPage('/profile/me')
    navigator('/profile/me')
  }

  return (

 

    <div style={{
        position: 'fixed', width: '100%', zIndex: 10, display: 'flex', justifyContent: 'space-evenly', 
        borderRadius: '10px',
        inset: 'auto 0 10px 0',
       margin: 'auto',
       padding: '10px',
        overflow: 'hidden'
    }}>

    
    <BottomNavigation
     sx={{ 
       width: '100%', zIndex: 10, display: 'flex', justifyContent: 'space-evenly', 
       borderRadius: '10px',
       boxShadow: `rgb(38, 57, 77) 0px 20px 30px -10px`,
      margin: 'auto',

       background: 'white',
       overflow: 'hidden'
       }}>
     
      <Box value={0} sx={{ display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}} 
      onClick={()=> {goToMain()}}>
        {/* <HomeIcon sx={{fontSize: '1.9em', color: theme.palette.purple_selected_icon}}/> */}
        <HomeIcon sx={{
          fontSize: iconInitialState == 0 ? '1.9em' : '1.4em', 
          color: iconInitialState == 0 ? theme.palette.purple_selected_icon : theme.palette.dark
          }}/>
      </Box>

      <Box value={1} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}} 
      onClick={()=> {goToMyComments()}}>
        <InsertCommentIcon  
        sx={{
          fontSize: iconInitialState == 1 ? '1.9em' : '1.4em', 
          color: iconInitialState == 1 ? theme.palette.purple_selected_icon : theme.palette.dark
          }}/>
      </Box>
  
      <Box value={2} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}}
       onClick={()=> {goToResults()}}>
        <SearchIcon  sx={{
          fontSize: iconInitialState == 2 ? '1.9em' : '1.4em', 
          color: iconInitialState == 2 ? theme.palette.purple_selected_icon : theme.palette.dark
          }}/>
      </Box>

      <Box value={2} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '25%'}}
       onClick={()=> {goToProfile()}}>

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