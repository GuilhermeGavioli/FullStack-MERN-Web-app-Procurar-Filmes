import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext,useEffect } from 'react';
import { AuthContext, SidebarContext } from '../App';
import { Avatar, Menu, MenuItem, Skeleton } from '@mui/material';
import { grey,amber } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import TopBarInput from './TopBarInput';
// import { styled as MUIStyled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import styled from 'styled-components';

const MySearchInput = styled.input`
  background: ${grey[50]};
  display: ${(props) => (props.isInputOpen ? 'hidden' : 'none')};
  border: none;
  height: 30px;
  outline: none;
  border-radius: 4px;
  padding-left: 5px;
`


export default function TopBar() {
  const [loading, setLoading] = useState(true);
  const { setIsSidebarOpen } = useContext(SidebarContext)
    const {auth, setAuth, logout} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
  const [isInputOpen, setIsInputOpen] = useState(false)
 
  
    useEffect(()=>{
      setTimeout(() => {
        setLoading(false)
      }, 3000);
    },[loading])

    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed',top: 0, width: '100vw', zIndex: 10 }}>
      <AppBar position="static" sx={{background: grey[900]}}>
        <Toolbar variant="regular" sx={{justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
       

       
          {/* <Typography variant="h6" color="inherit" component="div">
            Movies
          </Typography> */}

          {auth.isAuth && (
            <div style={{}}>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
     
              >
                {
                  loading ? 
                  <Skeleton animation="wave" variant="circular" width={'35px'} height={'35px'} sx={{bgcolor: grey[700]}} />
                  :
                <Avatar alt={auth.user?.name} src="/static/images/avatar/1.jpg"  sx={{p:0,m:0, width: '32px', height: '32px',bgcolor: grey[800] }} />
                }
              
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => {handleClose(); logout()}}>Logout</MenuItem>
              </Menu>
            </div>
          )}

        <div style={{display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'space-between'}}>
      
            <MySearchInput isInputOpen={isInputOpen}
              placeholder="Search…"
          
              />
<IconButton size="large" aria-label="search" color="inherit" sx={{m:0, p:0}} onClick={() => setIsInputOpen(!isInputOpen)}>
            <SearchIcon sx={{fontSize: '.9em'}} />
          </IconButton>
        </div>


        </Toolbar>
      </AppBar>
    </Box>
  );
}














