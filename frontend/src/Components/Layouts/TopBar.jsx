import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';

import { useState, useContext } from 'react';

import { Avatar, FormControl, Input, InputBase, InputLabel, Menu, MenuItem, Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import styled from 'styled-components';
import { theme } from '../../theme';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

import { AuthContext } from '../Contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Contexts/ThemeContext';


const BootstrapInput = styled(Input)(({ currentTheme }) => ({

    borderRadius: '4px 0px 0px 4px',
   
    backgroundColor: '#F3F6F9',
    border: 'none',
    borderColor: '#E0E3E7',
    fontSize: '.9em',
    height: '100%',
    width: '100px',
    padding: '2px 8px',
    margin: 0,
    transition: '0.2s ease-in-out',
    // Use the system font instead of the default Roboto font.
    '&:focus': {

      borderColor: currentTheme.palette.pink,
    },

}));



export default function TopBar() {
  const navigator = useNavigate()
    
  
  const {user, auth, userLoading, goTo} = useContext(AuthContext)
  const {currentTheme, setCurrentTheme} = useContext(ThemeContext)

  const [searchInput, setSearchInput] = useState('')
  const [isSearchOn, setIsSearchOn] = useState(false)

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
      <AppBar position="static" sx={{background: currentTheme.palette.mid, boxShadow: 'none'}}>
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
              
                  <Skeleton animation="wave" variant="circular" width={'35px'} height={'35px'} sx={{bgcolor: currentTheme.palette.lighter}} />
            
                  :
            
                <Avatar draggable='false' onClick={() => decideWhereToGo()} alt={user.name} src={user.picture}  sx={{p:0,m:0, width: '35px', height: '35px',bgcolor: grey[800] }} />
              
                }


              </IconButton>
            

            </div>

<div style={{display: 'flex', alignItems: 'center', gap: '10px',height: '35px'}}>


<div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
  {/* <input type="text" style={{border: 'none', background: 'white', onH}} />
  <SearchIcon style={{background: currentTheme.palette.pink}}/> */}


  {/*start here---------------------------- */}
  {
  isSearchOn &&
  <>
  

        {/* <BootstrapInput   currentTheme={currentTheme} defaultValue="react-bootstrap" id="bootstrap-input" /> */}
    <input type="text" placeholder="Pesquisar..." style={{width: '140px', height: '100%', fontSize: '0.9em', padding: '5px', paddingLeft: '10px', border: 'none', 
      borderRadius: '4px 0px 0px 4px', outline: 'none'}}
      onChange={(e)=>{setSearchInput(e.target.value)}}
      />
     
     <div onClick={() => goToResults()}  style={{height: '100%',background: currentTheme.palette.pink, width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px'}}>
          <SearchIcon style={{fontSize: '1.3em'}}/>
     </div>
    </>
    }
  {/* start here---------------------------- */}
</div>
        <div  onClick={() => {toggleSearch()}} style={{ padding: '0', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center',
          justifyContent: 'center'
        }}>

          {/*
           todo
          redirect to search on input enter
          escrever nao permitido quando charactere invalido em comentario
          adicionar cores em radial nas paginas principais ou adicionar 'cortinas' com shadow nas bordas
          */}
            {
              isSearchOn ?
              <VisibilityOffIcon  sx={{fontSize: '1.3em'}}/>
              :
              <SearchIcon  sx={{fontSize: '1.3em'}}/>

            }
        </div>
      
        </div>
        </Toolbar>
      </AppBar>
    </Box>

  );
}














