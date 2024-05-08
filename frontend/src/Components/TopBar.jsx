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


export default function TopBar() {
  const [loading, setLoading] = useState(true);
  const { setIsSidebarOpen } = useContext(SidebarContext)
    const {auth, setAuth, logout} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
  
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
        <Toolbar variant="regular" sx={{justifyContent: 'space-between'}}>
          <IconButton onClick={() => {setIsSidebarOpen(true)}} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon  />
          </IconButton>
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
                <Avatar alt={auth.user?.name} src="/static/images/avatar/1.jpg"  sx={{ width: '35px', height: '35px',bgcolor: grey[800] }} />
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


        </Toolbar>
      </AppBar>
    </Box>
  );
}