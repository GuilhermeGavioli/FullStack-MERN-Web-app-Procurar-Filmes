import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { grey,amber } from '@mui/material/colors';



export default function AppBar2() {
    const {auth, setAuth, logout} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
  
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
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Movies
          </Typography>

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
                <Avatar alt="Gemy Sharp" src="/static/images/avatar/1.jpg"  sx={{ width: '35px', height: '35px',bgcolor: grey[800] }} />
              
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