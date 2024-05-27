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
import { Box } from '@mui/material';
import { theme } from '../../theme';


export default function BottomBar() {


  const navigator = useNavigate()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {

  };

  function goToMain(){
    navigator('/')
  }

  function goToMyComments(){
    navigator('/mycomments')
  }

  function goToResults(){
    navigator('/results')
  }

  return (
    <BottomNavigation
     sx={{ background: theme.palette.lighter, position: 'fixed',bottom: 0, width: '100vw', zIndex: 10, display: 'flex', justifyContent: 'space-evenly'  }}>
     
      <Box value={0} sx={{background: pink[700], display: 'flex', justifyContent:'center', alignItems: 'center', width: '33.33%'}} 
      onClick={()=> {goToMain()}}>
        <HomeIcon sx={{fontSize: '1.9em', color: grey[100]}}/>
      </Box>

      <Box value={1} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '33.33%'}} 
      onClick={()=> {goToMyComments()}}>
        <InsertCommentIcon  sx={{fontSize: '1.4em', color: grey[600]}}/>
      </Box>
  
      <Box value={2} sx={{display: 'flex', justifyContent:'center', alignItems: 'center', width: '33.33%'}}
       onClick={()=> {goToResults()}}>
        <SearchIcon  sx={{fontSize: '1.6em', color: grey[600]}} />
      </Box>
      
    </BottomNavigation>
  )
}