import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';

import { useState, useContext } from 'react';

import { Avatar, Menu, MenuItem, Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';

import SearchIcon from '@mui/icons-material/Search';

import styled from 'styled-components';
import { theme } from '../../theme';


import { AuthContext } from '../Contexts/AuthContext';

export default function TopBar() {
  
  const {user, userLoading, logout} = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (event) => {
      
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (



    <Box sx={{ flexGrow: 1, position: 'fixed',top: 0, width: '100vw', zIndex: 10, 
    boxShadow: 'unset'
      // boxShadow: 'rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  }}>
      <AppBar position="static" sx={{background: theme.palette.mid}}>
        <Toolbar variant="regular" sx={{justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
           
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
                  userLoading ? 
              
                  <Skeleton animation="wave" variant="circular" width={'35px'} height={'35px'} sx={{bgcolor: theme.palette.lighter}} />
            
                  :
            
                <Avatar alt={user.name} src={user.picture}  sx={{p:0,m:0, width: '32px', height: '32px',bgcolor: grey[800] }} />
              
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

        <div style={{background: theme.palette.lighter, padding: '0', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center',
          justifyContent: 'center'
        }}>
          <SearchIcon  sx={{fontSize: '1.3em'}}/>
        </div>
        </Toolbar>
      </AppBar>
    </Box>

  );
}














