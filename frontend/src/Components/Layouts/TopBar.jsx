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
import { useNavigate } from 'react-router-dom';


export default function TopBar() {
  const navigator = useNavigate()
  const {user, userLoading, goTo} = useContext(AuthContext)

  return (



    <Box sx={{ flexGrow: 1, position: 'fixed',top: 0, width: '100vw', zIndex: 10, 
    boxShadow: 'none'
      // boxShadow: 'rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  }}>
      <AppBar position="static" sx={{background: theme.palette.mid, boxShadow: 'none'}}>
        <Toolbar variant="regular" sx={{justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
           
            <div>
              <IconButton
              
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
     
              >
                {
                  userLoading ? 
              
                  <Skeleton animation="wave" variant="circular" width={'35px'} height={'35px'} sx={{bgcolor: theme.palette.lighter}} />
            
                  :
            
                <Avatar onClick={() => {goTo('/profile/me')}} alt={user.name} src={user.picture}  sx={{p:0,m:0, width: '32px', height: '32px',bgcolor: grey[800] }} />
              
                }
              
              </IconButton>

            </div>

        <div  onClick={() => {goTo('/results')}} style={{background: theme.palette.lighter, padding: '0', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center',
          justifyContent: 'center'
        }}>
          <SearchIcon  sx={{fontSize: '1.3em'}}/>
        </div>
        </Toolbar>
      </AppBar>
    </Box>

  );
}














