import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';

import { useState, useContext } from 'react';


import { styled } from '@mui/material/styles';
import { Avatar, FormControl, Input, InputBase, InputLabel, Menu, MenuItem, Skeleton, Switch } from '@mui/material';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { AuthContext } from '../Contexts/AuthContext';
import { LocationContext } from '../Contexts/LocationContext';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function TopBar() {
  const {goTo} = useContext(LocationContext)
  const {user, auth, userLoading} = useContext(AuthContext)
  const {currentTheme, isDarkMode, changeDarkMode } = useContext(ThemeContext)

  const [searchInput, setSearchInput] = useState(null)
  const [isSearchOn, setIsSearchOn] = useState(false)

    const [imgSrc, setImgSrc] = useState(user.picture);
    const fallbackSrc = 'https://smartcitybusiness.com.br/wp-content/uploads/2025/03/default-avatar-icon-of-social-media-user-vector.jpg';

  function decideWhereToGo(){
    if (!userLoading && !auth){
      goTo('/login')
    } else {
      goTo('/profile/me')
    }
  }
  
  function toggleSearch(){
    setIsSearchOn(() => {return !isSearchOn})
  }

  function goToResults(){
    console.log()
    goTo(`/results?search=${searchInput}`)
  }

  return (



    <Box sx={{ flexGrow: 1, position: 'fixed',top: 0, width: '100vw', zIndex: 10, 
    boxShadow: 'none'
      // boxShadow: 'rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  }}>
      <AppBar position="static" sx={{background: currentTheme.palette.bars, boxShadow: 'none'}}>
        <Toolbar variant="regular" sx={{justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
           
            <div draggable='false'>
              <IconButton
              draggable='false'
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
     
              >
                {
                  userLoading && !user.name ? 
              
                  <Skeleton animation="wave" variant="circular" width={'40px'} height={'40px'} sx={{bgcolor: currentTheme.palette.lighter}} />
            
                  :
            
                <Avatar draggable='false' onClick={() => decideWhereToGo()} alt={user.name} 
                src={imgSrc || fallbackSrc}  
                 onError={() => setImgSrc(fallbackSrc)}
                sx={{p:0,m:0, width: '40px', height: '40px' }} />
              
                }


              </IconButton>
            

            </div>

<div style={{display: 'flex', alignItems: 'center', gap: '10px',height: '35px'}}>


<div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>

  {
  isSearchOn && 
  <>
  

    <input focus={isSearchOn} type="text" placeholder="Pesquisar..." style={{width: '140px', height: '100%', fontSize: '0.9em', padding: '5px', paddingLeft: '10px', border: 'none', 
      borderRadius: '4px 0px 0px 4px', outline: 'none'}}
      onChange={(e)=>{setSearchInput(e.target.value)}}
      />
     
     <div onClick={() => goToResults()}  style={{height: '100%',background: currentTheme.palette.contra, borderRadius: '0 4px 4px 0', width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px'}}>
          <SearchIcon style={{fontSize: '1.5em', color: currentTheme.palette.darker}}/>
     </div>
    </>
    }
  {/* start here---------------------------- */}
</div>
        <div  onClick={() => {toggleSearch()}} style={{ padding: '0', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center',
          justifyContent: 'center'
        }}>
            
          


  <SearchIcon  sx={{fontSize: '1.6em'}}/>


              

            
        </div>
      
        </div>
        </Toolbar>
      </AppBar>
    </Box>

  );
}











const MaterialUISwitch = styled(Switch)(({ currentTheme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
          transform: 'translateX(22px)',
          '& .MuiSwitch-thumb:before': {
          backgroundColor: currentTheme.palette.sec,
          borderRadius: '50%',
        color: 'orange',
        // backgroundColor: 'red',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: currentTheme.palette.lighter,
        ...currentTheme.applyStyles('dark', {
          backgroundColor: 'red',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: currentTheme.palette.sec,
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...currentTheme.applyStyles('dark', {
      backgroundColor: 'red',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...currentTheme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));



